from bs4 import BeautifulSoup
import urllib.request
import json
import io

def getUrlHtml(url:str) -> str:
	"""
	Function to get the HTML of the given url.

	Parameters
	----------
	url : str
		The URL from where get the HTML

	Returns
	-------
	str
		the HTML content of the given URL
	"""
	# Add User-Agent to the opener
	opener = urllib.request.build_opener()
	opener.addheaders = [('User-Agent', 'MyApp/1.0')]
	urllib.request.install_opener(opener)
	# Get the content
	fp = urllib.request.urlopen(url)
	mybytes = fp.read()
	mystr = mybytes.decode("utf8")
	fp.close()

	return mystr

def main():
	mainContent = getUrlHtml("https://www.lingohut.com/es/l83/aprende-ucraniano")
	soup = BeautifulSoup(mainContent, 'html.parser')
	lessonsDivs = soup.find_all("div", {"class": "lesson-link"})
	counter = 1
	data = {}
	for lessonDiv in lessonsDivs:
		data[counter] = {}

		lessonLink = lessonDiv.a['href']
		lessonSpans = [x for x in lessonDiv.a.div.contents if x != ' ']
		lessonTitle = lessonSpans[2].string.strip()

		lessonPageContent = getUrlHtml(lessonLink)
		lessonPageSoup = BeautifulSoup(lessonPageContent, 'html.parser')
		lessonPageButtons = lessonPageSoup.find_all('button', {'class': 'vocab-box'})

		data[counter]['title'] = lessonTitle
		data[counter]['link'] = lessonLink
		data[counter]['content'] = {}
		contentCounter = 1
		for lessonPageButton in lessonPageButtons:
			data[counter]['content'][contentCounter] = {}
			audioName = lessonPageButton['data-mp3-name']
			lessonPageSpans = [x for x in lessonPageButton.contents if x != ' ']
			lessonPageSpain = lessonPageSpans[0].string.strip()
			lessonPageUcraPhoneme = lessonPageSpans[1].get_text().split(' (')
			lessonPageUcra = lessonPageUcraPhoneme[0]
			lessonPagePhoneme = lessonPageUcraPhoneme[1].rstrip(')')
			data[counter]['content'][contentCounter]['espa'] = lessonPageSpain
			data[counter]['content'][contentCounter]['ucra'] = lessonPageUcra
			data[counter]['content'][contentCounter]['phoneme'] = lessonPagePhoneme
			data[counter]['content'][contentCounter]['audio'] = audioName
			contentCounter += 1

		counter += 1
	jsonString = json.dumps(data, sort_keys=True, indent=4)
	with open('allData.json', 'w', encoding='utf8') as json_file:
		json.dump(jsonString, json_file, ensure_ascii=False)

if __name__ == "__main__":
	with open('allData.json', 'r', encoding='utf-8') as json_file:
		content = json.loads(json_file.read())


with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(content, f, ensure_ascii=False)
print(content)
    # main()