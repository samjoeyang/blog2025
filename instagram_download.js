const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const USERNAME = 'samjoeyang';
const PASSWORD = 'nokia7650';
const POSTS_DIR = '/Users/samjoeyang/workspace/blog2025/source/_posts';
const IMG_DIR = '/Users/samjoeyang/workspace/blog2025/source/images/needisme/external';

fs.mkdirSync(IMG_DIR, { recursive: true });

// Read unique URLs
const urls = fs.readFileSync('/tmp/insta_urls.txt', 'utf-8').trim().split('\n').filter(Boolean);

// Read URL-to-post mapping
const urlToPosts = {};
const mapLines = fs.readFileSync('/tmp/insta_mapping.txt', 'utf-8').trim().split('\n').filter(Boolean);
for (const line of mapLines) {
  const [url, fname] = line.split('|');
  if (!urlToPosts[url]) urlToPosts[url] = [];
  urlToPosts[url].push(fname);
}

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
      timeout: 10000 
    }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const size = fs.statSync(dest).size;
          resolve(size > 200);
        });
      } else {
        file.close();
        fs.unlinkSync(dest);
        resolve(false);
      }
    }).on('error', () => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // Login - go to main page first, login modal will appear
  console.log('Logging in...');
  await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  // Wait for the page to fully render, then screenshot for debugging
  await page.screenshot({ path: '/tmp/insta_debug.png' });
  console.log('Saved debug screenshot to /tmp/insta_debug.png');
  
  // Check if already at login page (redirected)
  const currentUrl = page.url();
  console.log('Current URL:', currentUrl);
  
  // Try different selectors for login fields
  const loginSelectors = [
    'input[name="username"]',
    'input[type="text"]',
    'input[autocomplete="username"]',
    'input[placeholder*="phone"]',
    'input[placeholder*="Phone"]',
    'input[placeholder*="username"]'
  ];
  
  let usernameInput = null;
  for (const sel of loginSelectors) {
    try {
      usernameInput = await page.waitForSelector(sel, { timeout: 3000 });
      if (usernameInput) {
        console.log('Found input with selector:', sel);
        break;
      }
    } catch(e) {}
  }
  
  if (!usernameInput) {
    // Dump page HTML for debugging
    const html = await page.content();
    fs.writeFileSync('/tmp/insta_debug.html', html);
    console.log('Could not find login fields. HTML saved to /tmp/insta_debug.html');
    await browser.close();
    process.exit(1);
  }
  
  await usernameInput.type(USERNAME, { delay: 50 });
  
  // Find password input
  const passwordSelectors = ['input[name="password"]', 'input[type="password"]'];
  let passwordInput = null;
  for (const sel of passwordSelectors) {
    try {
      passwordInput = await page.waitForSelector(sel, { timeout: 3000 });
      if (passwordInput) break;
    } catch(e) {}
  }
  
  if (passwordInput) {
    await passwordInput.type(PASSWORD, { delay: 50 });
    
    // Click submit button
    let submitBtn = await page.$('button[type="submit"]');
    if (!submitBtn) {
      // Fallback: find via evaluate
      const found = await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        for (const b of btns) {
          if (b.textContent.includes('Log') || b.textContent.includes('Sign')) return true;
        }
        return false;
      });
      if (found) {
        await page.evaluate(() => {
          const btns = document.querySelectorAll('button');
          for (const b of btns) {
            if (b.textContent.includes('Log') || b.textContent.includes('Sign')) { b.click(); break; }
          }
        });
      }
    }
    if (submitBtn) {
      await submitBtn.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
      await new Promise(r => setTimeout(r, 3000));
      console.log('Post-login URL:', page.url());
    }
  }
  
  console.log('Login done. Processing URLs...');
  
  let success = 0;
  let fail = 0;
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i].trim();
    if (!url) continue;
    
    // Extract shortcode
    const shortcodeMatch = url.match(/instagram\.com\/p\/([^/?]+)/);
    if (!shortcodeMatch) { fail++; continue; }
    const shortcode = shortcodeMatch[1];
    const hash = require('crypto').createHash('md5').update(url).digest('hex').slice(0, 12);
    const localFile = path.join(IMG_DIR, `insta_${hash}.jpg`);
    
    if (fs.existsSync(localFile) && fs.statSync(localFile).size > 200) {
      console.log(`[${i+1}/${urls.length}] Already exists: ${shortcode}`);
      success++;
      continue;
    }
    
    try {
      console.log(`[${i+1}/${urls.length}] Fetching: ${shortcode}...`);
      await page.goto(`https://www.instagram.com/p/${shortcode}/`, { 
        waitUntil: 'networkidle2', 
        timeout: 20000 
      });
      
      // Scroll down to load lazy content
      await page.evaluate(() => window.scrollTo(0, 500));
      await new Promise(r => setTimeout(r, 2000));
      
      // Find the actual post image (not the profile avatar)
      const imgUrl = await page.evaluate(() => {
        // Get all images
        const allImgs = document.querySelectorAll('img');
        let bestImg = null;
        let bestSize = 0;
        
        for (const img of allImgs) {
          const src = img.src || '';
          // Skip small profile avatars (< 100px)
          const rect = img.getBoundingClientRect();
          const area = rect.width * rect.height;
          
          // Prefer images in the main article area, larger than 100x100
          if (src.includes('cdninstagram') && area > 10000) {
            if (area > bestSize) {
              bestSize = area;
              bestImg = src;
            }
          }
        }
        
        return bestImg;
      });
      
      if (imgUrl) {
        console.log(`  Found image: ${imgUrl.slice(0, 80)}...`);
        const ok = await downloadImage(imgUrl, localFile);
        if (ok) {
          console.log(`  ✅ Downloaded (${fs.statSync(localFile).size} bytes)`);
          success++;
          
          // Update posts
          const localPath = `/images/needisme/external/insta_${hash}.jpg`;
          const affected = urlToPosts[url] || [];
          for (const fname of affected) {
            const fpath = path.join(POSTS_DIR, fname);
            if (fs.existsSync(fpath)) {
              let content = fs.readFileSync(fpath, 'utf-8');
              if (content.includes(url)) {
                content = content.replaceAll(url, localPath);
                fs.writeFileSync(fpath, content);
                console.log(`  Updated: ${fname}`);
              }
            }
          }
        } else {
          console.log(`  ❌ Download failed`);
          fail++;
        }
      } else {
        console.log(`  ❌ No image found on page`);
        fail++;
      }
    } catch (e) {
      console.log(`  ❌ Error: ${e.message}`);
      fail++;
    }
    
    // Small delay between requests
    await new Promise(r => setTimeout(r, 2000));
  }
  
  await browser.close();
  console.log(`\n=== Done ===`);
  console.log(`Success: ${success}, Failed: ${fail}`);
})();
