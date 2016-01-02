# ALC English Word Save
This chrome extension is mainly for **Japanese**. You can add "Save" button in your [ALC](http://www.alc.co.jp/) search result so that you can save your favorite words to your google spreadsheet for your English study.

#### Save button embedding
<img src="https://raw.githubusercontent.com/taxpon/alc-save/master/resources/ss1.jpg" width="600" >

#### Saved result in Google Spreadsheet
<img src="https://raw.githubusercontent.com/taxpon/alc-save/master/resources/ss2.jpg" width="600" >

## How to Use
1. Install Alc Save from [Chrome Web Store](https://chrome.google.com/webstore/detail/alc-english-word-save/fpggbfcjkkamfpahhndcojlfaffdbiii)
2. Set up your remote server url from option of this extension.

## Server Code
If you click save button, this extension send POST request to the server specified in option setting. That means you can choose your server and you do not need to use Google Spreadsheet. If you use Google spreadsheet, you can use [this code](https://raw.githubusercontent.com/taxpon/alc-save/master/server_example.js).

### Post parameters
| Name | Value |
-------|--------
| word | Selected English word |
| meaning | Retrieved meaning of the word |


## License
MIT

