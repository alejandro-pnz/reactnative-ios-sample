1. Ставим Node.js 
https://nodejs.org/download/
2. Ставим Homebrew 
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
3. Далее NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.0/install.sh | bash
4. Следом io.js
nvm install iojs-v2 && nvm alias default iojs-v2
5. Ну и для удобной отладки:
brew install watchman
brew install flow
6. И теперь сам Реакт:
npm install -g react-native-cli
7. Теперь можно приступать к работе