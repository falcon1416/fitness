#coding=utf-8
#https://blog.csdn.net/qq_21579045/article/details/88657013
#第二步:将英文语句切片 中文用nltk切片

import nltk
# nltk.download("punkt")

en = open('./data/test.en', 'w', encoding='utf-8')
with open("./data/tran.en","r",encoding="utf-8") as f:
  data=f.readlines()
  for buf in data:
    #过滤最后的回车符
    buf=buf.replace("\n", "")
    segs = nltk.word_tokenize(buf)
    word=" ".join(segs)
    print(word)
    en.write(word + '\n')

en.close()