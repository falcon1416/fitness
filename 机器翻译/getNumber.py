#coding=utf-8
#https://blog.csdn.net/qq_21579045/article/details/88657013
#第四步:根据词汇文件转化为单词编号。每个单词的编号就是它在词汇文件中的行号

import codecs

def deal(lang):
  testFileName="./data/test."+lang
  vocabFileName="./data/"+lang+".vocab"

  numberFileName="./data/"+lang+".number"

  # 读取词汇表，并建立词汇到单词编号的映射。
  with codecs.open(vocabFileName, "r", "utf-8") as f_vocab:
    vocab = [w.strip() for w in f_vocab.readlines()]
  word_to_id = {k: v for (k, v) in zip(vocab, range(len(vocab)))}
  print(word_to_id)

  # 如果出现了被删除的低频词，则替换为"<unk>"。
  def get_id(word):
    return word_to_id[word] if word in word_to_id else word_to_id["<unk>"]
  
  fin = codecs.open(testFileName, "r", "utf-8")
  fout = codecs.open(numberFileName, 'w', 'utf-8')
  for line in fin:
    # 读取单词并添加<eos>结束符
    words = line.strip().split() + ["<eos>"]
    # 将每个单词替换为词汇表中的编号
    out_line = ' '.join([str(get_id(w)) for w in words]) + '\n'
    fout.write(out_line)
  fin.close()
  fout.close()


if __name__ == "__main__":
  deal('zh')
  deal('en')