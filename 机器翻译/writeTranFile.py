#coding=utf-8
#https://blog.csdn.net/qq_21579045/article/details/88657013
#第一步:将语料文件拆成中英两个文件

zh = open('./data/tran.zh', 'w', encoding='utf-8')
en = open('./data/tran.en', 'w', encoding='utf-8')

index =0
with open("./data/t.txt","r",encoding="utf-8") as f:
  data=f.readlines()
  for buf in data:
    print(buf)
    if index%2==0:
      zh.write(buf)
    else:
      en.write(buf)
    index=index+1

zh.close()
en.close()