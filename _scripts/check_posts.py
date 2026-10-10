import re, glob

files = [
    "/Users/samjoeyang/workspace/blog2025/source/_posts/为什么有人专门收购知识产权.md",
    "/Users/samjoeyang/workspace/blog2025/source/_posts/职业权利人到底是什么.md",
    "/Users/samjoeyang/workspace/blog2025/source/_posts/知识产权为什么越来越像互联网生意.md",
]

phrases = ["我认识","我见过","我常跟人讲","我常想","依我看","说句实话","说白了","我觉得","我认为","我的看法是","我处理过"]

def strip_structural(paras):
    out=[]
    for p in paras:
        if p.startswith("#"): continue          # headings
        if p.startswith("📚"): continue          # 返回目录
        if p.startswith("👉"): continue          # CTA link
        if p.startswith("!["): continue          # CTA image
        if p.startswith("本文仅作"): continue     # disclaimer
        if p.startswith("**资料来源"): continue   # 资料来源
        if p.startswith("如果你"): continue       # CTA block start
        if p.startswith("微信扫码"): continue     # CTA disclaimer
        out.append(p)
    return out

for f in files:
    txt = open(f, encoding="utf-8").read()
    parts = txt.split("---", 2)
    body = parts[2] if len(parts) >= 3 else txt
    idx = body.find("\n---\n")
    bm = body[:idx] if idx != -1 else body
    paras_all = [p.strip() for p in re.split(r"\n\s*\n", bm) if p.strip()]
    paras = strip_structural(paras_all)
    cn = len(re.findall(r"[一-鿿]", "\n".join(paras)))
    q = len(re.findall(r"[？?]", "\n".join(paras)))
    bold = "\n".join(paras).count("**") // 2
    fp = {}
    joined = "\n".join(paras)
    for p in phrases:
        c = joined.count(p)
        if c: fp[p]=c
    fp_total = sum(fp.values())
    # consecutive single-sentence in prose
    cur=0;best=0
    for p in paras:
        s=len(re.findall(r"[。！？!?]",p))
        if s<=1: cur+=1; best=max(best,cur)
        else: cur=0
    dens=q/(cn/500) if cn else 0
    fp_dens=fp_total/(cn/1000) if cn else 0
    bold_limit=max(3, 3*cn//1000)
    print("="*55)
    print(f.split("/")[-1])
    print(f"  字数: {cn} (需1800-3000)")
    print(f"  设问: {q}  密度 {dens:.2f}/500 (需>=2)")
    print(f"  加粗: {bold} (限<={bold_limit})")
    print(f"  第一人称: {fp_total} 分布 {fp} 密度 {fp_dens:.2f}/千字 (需3-5)")
    print(f"  连续单句成段最大: {best} (需<3)")
    ok = (1800<=cn<=3000) and (dens>=2) and (bold<=bold_limit) and (3<=fp_dens<=5) and (best<3)
    print(f"  >>> 达标: {ok}")
