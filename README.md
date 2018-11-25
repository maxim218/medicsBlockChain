# BlockChain в медицине

Внутри папки **chaincode/fabcar/node** ставим библиотеки NodeJS

```
npm install
```

Внутри папки **fabcar** ставим библиотеки NodeJS

```
npm install
```

Заходим в папку **fabcar**

```
cd fabcar
```

Запускаем fabric

```
sudo bash ./startFabric.sh node
```

Добавляем админа

```
node enrollAdmin.js
```

Добавляем пользователя

```
node registerUser.js
```

Запускаем сервер

```
npm start
```

Запускаем клиента

```
python ./send.py
```

