#coding=utf-8
#https://blog.csdn.net/qq_21579045/article/details/88657013
#第二步:将中文语句切片 中文用jieba切片
import jieba

zh = open('./data/test.zh', 'w', encoding='utf-8')
with open("./data/tran.zh","r",encoding="utf-8") as f:
  data=f.readlines()
  for buf in data:
    #过滤最后的回车符
    buf=buf.replace("\n", "")
    segs=jieba.lcut(buf)
    word=" ".join(segs)
    print(word)
    zh.write(word + '\n')

zh.close()