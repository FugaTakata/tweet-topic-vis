import string
import json
import datetime
import pke
import nltk
import spacy
from spacy.lang.ja import stop_words

pke.base.lang_stopwords['ja_ginza'] = 'japanese'

data_path = '../data/postcrisis_pq2011.json'
json_path = '../public/data/data.json'

data = []
aggregated = []

heart = 0

with open(data_path, encoding='UTF-8', mode='r')as f_r:
    for row in f_r:
        heart += 1
        if heart % 50000 == 0:
            break
        obj = json.loads(row.strip())
        created_at = obj['created_at']
        year = int(created_at[0:4])
        month = int(created_at[5:7])
        day = int(created_at[8:10])
        hour = int(created_at[11:13])

        date = datetime.datetime(year, month, day, hour)

        iso_date = date.isoformat()

        data.append(
            {'text': obj['text'], 'created_at': iso_date})

cur_date = data[0]['created_at']
t = ''
for d in data:
    if cur_date == d['created_at']:
        t += d['text'] + ' '
    elif cur_date == None:
        cur_date = d['created_at']
        t += d['text'] + ' '
    else:
        a_data = {'text': t, 'created_at': cur_date}
        aggregated.append(a_data)
        t = ''
        cur_date = None


def get_key_phrase(spacy_model, text, n=5):
    extractor = pke.unsupervised.TopicRank()
    extractor.load_document(input=text, language='ja_ginza',
                            normalization=None, spacy_model=spacy_model)
    extractor.candidate_selection(pos={'NOUN', 'PROPN', 'ADJ', 'NUM'})
    extractor.candidate_weighting()
    key_phrase = extractor.get_n_best(n)
    return key_phrase


spacy_model = spacy.load('ja_ginza')
stop_words = list(stop_words.STOP_WORDS)
nltk.corpus.stopwords.words_org = nltk.corpus.stopwords.words
nltk.corpus.stopwords.words = lambda lang: stop_words if lang == 'japanese' else nltk.corpus.stopwords.words_org(
    lang)

d = []
key_phrases = {}
i = 0
for row in aggregated:
    i += 1
    print(i)
    key_phrase = {}
    for k in get_key_phrase(spacy_model, row['text'], n=10):
        key_phrase[k[0]] = k[1]
    for k in key_phrase:
        if k in key_phrases:
            key_phrases[k] += key_phrase[k]
        else:
            key_phrases[k] = key_phrase[k]

    d.append({**row, "key_phrase": key_phrase})

with open(json_path, encoding='UTF-8', mode='w') as f_w:
    j = {'data': d, 'key_phrase_sum': key_phrases}
    f_w.write(json.dumps(j, ensure_ascii=False))
