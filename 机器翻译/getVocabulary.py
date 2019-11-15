#coding=utf-8
#https://blog.csdn.net/qq_21579045/article/details/88657013
#第三步:按照词频顺序为每个词汇分配一个编号，然后将词汇表保存到一个独立的vocab文件中

import codecs
import collections
from operator import itemgetter

#词汇表单词个数
VOCAB_SIZE=10000

def deal(lang):
  testFileName="./data/test."+lang
  vocabFileName="./data/"+lang+".vocab"

  # 统计单词出现的频率
  counter = collections.Counter()
  with codecs.open(testFileName, "r", "utf-8") as f:
    for line in f:
      for word in line.strip().split():
        counter[word] += 1

  # 按照词频顺序对单词进行排序
  sorted_word_to_cnt = sorted(counter.items(), key=itemgetter(1), reverse=True)
  sorted_words = [x[0] for x in sorted_word_to_cnt]
  # 在后面处理机器翻译数据时，出了"<eos>"，还需要将"<unk>"和句子起始符"<sos>"加入
  # 词汇表，并从词汇表中删除低频词汇。在PTB数据中，因为输入数据已经将低频词汇替换成了
  # "<unk>"，因此不需要这一步骤。
  sorted_words = ["<unk>", "<sos>", "<eos>"] + sorted_words
  if len(sorted_words) > VOCAB_SIZE:
    sorted_words = sorted_words[:VOCAB_SIZE]
  
  with codecs.open(vocabFileName, 'w', 'utf-8') as file_output:
    for word in sorted_words:
      file_output.write(word + "\n")




if __name__ == "__main__":
  deal('zh')
  deal('en')