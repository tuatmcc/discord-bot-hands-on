---
title: Discord Botで始めるプログラミング入門講座

theme: default
transition: slide-left
mdc: true

class: text-center
---

# Discord Botで始める <br> プログラミング入門講座

2025/04/16

しゅん🌙 (@shun_shobon)

---
layout: image-right
image: images/meru.png
---

## 自己紹介

- 名前: しゅん🌙 (@shun_shobon)
- 所属: 知能情報システム(AS) B4
- 分野: Web技術, ネットワーク, デザイン
- 趣味: マイクラ, 音ゲー, etc...

---

## 今日の目標

1. JavaScriptが一通り使えるようになる！
2. Discord Botを作れるようになる！
3. プログラミングの楽しさを知る！

<br>
<br>

## おことわり

- 今日はとりあえず「動くもの」を作ることを目指します。そのため、細かい説明を省略している部分があります。もしわからない事があれば、TAなどに遠慮なく聞いてください！
- 進行の都合上、ある程度できる人には退屈な時間があるかもしれません。その場合はどんどん次のステップに進んでもらっても大丈夫です。
- **全てを講座通りに作る必要はありません！むしろ積極的な改変・改造を推奨しています！**

---

## 環境構築

今回使用するプログラミング言語はJavaScriptです。
JavaScriptは元々Webブラウザで動く言語でしたが、Node.jsの登場により今では様々な用途で使われています。

以下のツールをインストールします。

- VSCode <logos-visual-studio-code /> のインストール
- Git <logos-git-icon /> のインストール
- miseのインストール(Node.js <logos-nodejs-icon /> のインストール)

---

### VSCodeのインストール <logos-visual-studio-code />

VSCodeはMicrosoftが開発しているオープンソースのエディタです。
拡張機能が豊富で、JavaScriptの開発にも最適です。

[公式サイト](https://code.visualstudio.com/)からダウンロードも可能ですが、今どきのOSならCLIからインストールするのが楽です。

###### Windows:
```bash
winget install Microsoft.VisualStudioCode
```

###### Mac:
```bash
brew install visual-studio-code
```

Linuxはディストリビューション毎に異なるので各自調べてください。

---

### Gitのインストール <logos-git-icon />

Gitはバージョン管理システムです。主にソースコードの管理に使用されますが、レポートやドキュメントの管理にも使えます。
今回はGitHubというサイトからソースコードを落とすためだけに使います。

これもCLIからインストールするのが楽です。

###### Windows:
```bash
winget install Git.Git
```

###### Mac:
```bash
brew install git
```

インストール後、`git`コマンドが使えるようになっているか確認してください。

```bash
git --version
```

---

### miseのインストール

miseは開発に使用するツールを簡単にインストールできるCLIツールです。
今回はNode.jsのインストールに使用します。

[公式サイト](https://mise.jdx.dev/getting-started.html)の手順に従ってインストールしてください。

###### Windows:
```bash
winget install jdx.mise
```

###### Mac:
```bash
brew install mise
```

**なお、インストール後に「Activate mise」の手順も行ってください。**
<br>
以下のコマンドで正しくインストールされているか確認できます。

```bash
mise doctor
```

**これにて環境構築は完了です。お疲れ様でした 🎉**

---

## Botアカウントの作成

[Discord Developer Portal](https://discord.com/developers/applications)にアクセスしてBotアカウントを作成します。

1. 「New Application」をクリックして、好きな名前を入力して「Create」をクリックします。
2. 左側のメニューから「Bot」を選択し、「Reset Token」をクリックしてトークンを生成します。
3. トークンをコピーしておきます。後で使用します。なお、トークンは一度しか表示されません。コピーしたら大切に保管してください。
  **トークンは非常に大切な情報です！アカウントのパスワードなどと同様、絶対に他人に教えないでください。**
4. 「Privileged Gateway Intents」の欄の3つのスイッチを全てONにします。

---

## Botアカウントの作成

5. 左側のメニューから「OAuth2」を選択します。
6. 「OAuth2 URL Generator」の欄で以下のように設定します。
   - Scopes: `bot`
   - Bot Permissions: `View Channels`, `Send Messages`, `Read Message History`, `Add Reactions`, `Use Slash Commands`

![](./images/permissions.png){width=50%}

---

## Botアカウントの作成

7. 下の「Generated URL」をクリックして、生成されたURLをコピーします。
8. コピーしたURLをブラウザに貼り付けて、Botをサーバーに追加します。
  <br>
  (テスト用に適当なサーバーがあると便利です！)
9. うまくいけば、サーバーにBotが追加されています 🎉

![](./images/bot_success.png){width=28%}

---

## ソースコードの準備

今回使用するソースコードはGitHubで公開しています。

https://github.com/tuatmcc/discord-bot-hands-on

「Code」→「HTTPS」をクリックして表示されるURLをコピーしてください。

コピーしたURLを使って、以下のコマンドでソースコードをクローンします。

```bash
git clone https://github.com/tuatmcc/discord-bot-hands-on.git
```

クローンすると、`discord-bot-hands-on`というディレクトリが作成されます。それをVSCodeで開いてください。

```bash
code discord-bot-hands-on
```

---

## プロジェクトの初期化

VSCodeで開いたら、以下のコマンドを実行してNode.jsのインストールと依存関係のインストールを行います。

```bash
# Node.jsのインストール
mise install

# 依存関係のインストール
npm install
```

リポジトリには以下のようなものが含まれています。

- `src/`: ソースコードのディレクトリ。この中のコードを編集してプログラミングしていきます。
- `package.json`: プロジェクトの設定ファイル。依存関係やスクリプトが定義されています。
- `package-lock.json`: 依存関係のバージョンを固定するためのファイル。基本的に直接編集することはありません。
- `node_modules/`: 依存関係のライブラリがインストールされるディレクトリ。基本的に直接編集することはありません。
- `mise.toml`: miseの設定ファイル。

---

## プログラムを動かしてみる

まずは、プログラムを動かしてみます。
プログラムの動作にはBotのトークンが必要です。

`.env`を作成して、以下のように記述してください。

```bash
DISCORD_BOT_TOKEN = "<Botのトークン>"
```

以下のコマンドでプログラムを実行します。

```bash
npm run start
```

初めから書かれているコードはオウム返しするだけのBotです。
何かしらメッセージを送ると、Botが同じメッセージを返してくれます。

![](./images/bot_init.png)

なお、終了したい場合は`Ctrl + C`/`Command + C`で終了できます。

---

## ソースコードを読んでみる

`src/app.js`を開いてソースコードを見てみましょう。

````md magic-move {lines: true}
```js {*}
import { Client } from "discord.js";

const client = new Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  console.log(`Message received: ${message.content}`);

  await message.reply(message.content);
});

client.login(process.env["DISCORD_BOT_TOKEN"]);
```

```js {1-8|1-2|4-8}
// ライブラリのインポート
import { Client } from "discord.js";

// クライアントを作成
const client = new Client({
  // Botの動作に必要な権限を指定
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});
```

```js {*|1-5|3-4|7-17|9-10|12-13|15-16|19-20}
// Botの準備ができたら実行される
client.on("ready", () => {
  // Botの名前を表示
  console.log(`Logged in as ${client.user.tag}!`);
});

// メッセージを受信したら実行される
client.on("messageCreate", async (message) => {
  // Botが送信したメッセージは無視する(無限ループ防止)
  if (message.author.bot) return;

  // 受信したメッセージをコンソールに表示
  console.log(`Message received: ${message.content}`);

  // 受信したメッセージをそのまま返信
  await message.reply(message.content);
});

// Botを起動
client.login(process.env["DISCORD_BOT_TOKEN"]);
```
````

---

## ping/pongを作ってみる

このままだと全てのメッセージに対して反応するので結構うるさいです。
そこで、`ping`と送ると`pong`と返すようにしてみましょう。

````md magic-move {lines: true}
```js {*|9-10}
// メッセージを受信したら実行される
client.on("messageCreate", async (message) => {
  // Botが送信したメッセージは無視する(無限ループ防止)
  if (message.author.bot) return;

  // 受信したメッセージをコンソールに表示
  console.log(`Message received: ${message.content}`);

  // 受信したメッセージをそのまま返信
  await message.reply(message.content);
});
```

```js {9-15}
// メッセージを受信したら実行される
client.on("messageCreate", async (message) => {
  // Botが送信したメッセージは無視する(無限ループ防止)
  if (message.author.bot) return;

  // 受信したメッセージをコンソールに表示
  console.log(`Message received: ${message.content}`);

  // 受信したメッセージが"!ping"なら
  if (message.content === "!ping") {
    // "pong!"と返信
    await message.reply("pong!");
    // 処理終了
    return;
  }
});
```
````

---

## ping/pongを作ってみる

再度プログラムを実行すると、`!ping`と送ると`pong!`と返してくれるようになります。
また、それ以外のメッセージには反応しません。

![](./images/bot_pingpong.png)

`if`を使うことでメッセージの内容を条件にして処理を分岐させることができます。

`if`の中の条件式を変更すれば、`!ping`以外のメッセージにも反応させることができますし、`if`を増やしていけば他のメッセージに反応させることもできます。

```js
if (message.content === "!ping") {
  await message.reply("pong!");
  return;
}
if (message.content === "!hello") {
  await message.reply("Hello!");
  return;
}
```

---

## じゃんけんコマンドを作ってみる

次はじゃんけんを作ってみましょう。
`!janken`と送ると、ランダムにじゃんけんの手を返すようにします。

```js {*|1-2|3-4|5-6|7-8|10-12}{lines: true}
// 受信したメッセージが"!janken"なら
if (message.content === "!janken") {
  // じゃんけんの手
  const hands = ["グー", "チョキ", "パー"];
  // 0〜2のランダムな整数を生成
  const choiceIndex = Math.floor(Math.random() * hands.length);
  // 選んだ手を取得
  const choice = hands[choiceIndex];

  // 選んだ手を返信して終了
  await message.reply(`じゃんけんは${choice}！`);
  return;
}
```

![](./images/bot_janken.png)

---

## じゃんけんコマンドを作ってみる

このままだと勝敗がわからないので、勝敗を判定して返すようにしてみましょう。

````md magic-move {lines: true, maxHeight: '100px'}
```js
// 受信したメッセージが"!janken"なら
if (message.content === "!janken") {
  // じゃんけんの手
  const hands = ["グー", "チョキ", "パー"];
  // 0〜2のランダムな整数を生成
  const choiceIndex = Math.floor(Math.random() * hands.length);
  // 選んだ手を取得
  const choice = hands[choiceIndex];

  // 選んだ手を返信して終了
  await message.reply(`じゃんけんは${choice}！`);
  return;
}
```

```js {*|1-2|6-8|9-13}
// 受信したメッセージが"!janken"から始まっていたら
if (message.content.startsWith("!janken")) {
  // じゃんけんの手
  const hands = ["グー", "チョキ", "パー"];

  // メッセージを空白で分割してユーザーの手を取得
  const args = message.content.split(" ");
  const userHand = args[1];
  // 引数が指定されていない場合はエラーを表示して終了
  if (!hands.includes(userHand)) {
    await message.reply("グー、チョキ、パーのいずれかを指定してください。");
    return;
  }

  // 0〜2のランダムな整数を生成
  const choiceIndex = Math.floor(Math.random() * hands.length);
  // 選んだ手を取得
  const choice = hands[choiceIndex];

  // ...
```

```js {*|3-5|3,6-11|3,12-14}
  // ...

  // 勝敗を判定
  if (userHand === choice) {
    await message.reply(`わたし: ${choice}\nあいこ！`);
  } else if (
    (userHand === "グー" && choice === "チョキ") ||
    (userHand === "チョキ" && choice === "パー") ||
    (userHand === "パー" && choice === "グー")
  ) {
    await message.reply(`わたし: ${choice}\nあなたの勝ち！`);
  } else {
    await message.reply(`わたし: ${choice}\nあなたの負け！`);
  }
}
```
````

---

## じゃんけんコマンドを作ってみる

ユーザーの手に応じて勝敗を判定するようにしました。
`!janken <手>`と送ると、Botがランダムにじゃんけんの手を選び、勝敗を判定して返してくれます。

![](./images/bot_janken2.png)

`if`文と簡単な計算を組み合わせるだけでも結構色々なことができます。`!dice 3d6`のようにサイコロを振るコマンドとかも作れます。

---

## 天気予報を教えてくれるコマンドを作ってみる

`!weather`と送ると、天気予報を教えてくれるコマンドを作ってみましょう。
APIを使って天気予報を取得します。

APIは色々なものがありますが、今回は[天気予報API (livedoor天気互換)](https://weather.tsukumijima.net/)を利用します。
これはAPIキーが不要で、無料で使えるので特に登録などは必要ありません。

`https://weather.tsukumijima.net/api/forecast/city/<都市ID>`のURLにGETリクエストを送ると、JSON形式で天気予報が返ってきます。

東京の場合は`130010`、大阪の場合は`270000`、札幌の場合は`016010`です。

他の都市IDも以下のURLから確認できます。(`Ctrl + F` / `Command + F`で検索すると便利です)

https://weather.tsukumijima.net/primary_area.xml

---

## 天気予報を教えてくれるコマンドを作ってみる

まずは、天気予報の概要だけを取得して表示するようにしてみましょう。

```js {*}{lines: true}
if (message.content === "!weather") {
  // 天気予報APIにGETリクエストを送る
  const response = await fetch(
    "https://weather.tsukumijima.net/api/forecast/city/130010"
  );
  // エラーの場合はエラーメッセージを表示して終了
  if (!response.ok) {
    await message.reply("天気情報を取得できませんでした。");
    return;
  }
  // レスポンスをJSON形式に変換
  const data = await response.json();

  // 天気予報の概要を取得して表示
  const title = data.title;
  const overview = data.description.text;
  await message.reply(`# ${title}\n${overview}`);
}
```

---

## 天気予報を教えてくれるコマンドを作ってみる

`!weather`と送ると、天気予報の概要が表示されるようになります。

![](./images/bot_weather.png)

---

## 天気予報を教えてくれるコマンドを作ってみる

天気の概要だけでは面白くないので、`"forecasts"`の中から天気の情報を取得して表示するようにしてみましょう。

````md magic-move {lines: true}
```js {*}
// ...

// 天気予報の概要を取得して表示
const title = data.title;
const overview = data.description.text;
await message.reply(`# ${title}\n${overview}`);
```

```js {*|3-4|5-6|7-15|17-18}
// ...

// 返信するメッセージを変数で持つ
let reply = "";
// タイトルを追加
reply += `# ${data.title}\n`;
// forecastsの中を順番に処理
for (const forecast of data.forecasts) {
  // 日付の文字列をDateオブジェクトに変換
  const date = new Date(forecast.date);
  // 〇月〇日の形式に変換して追加
  reply += `## ${date.getMonth() + 1}月${date.getDate()}日\n`;
  // 天気を追加
  reply += `天気: ${forecast.telop}\n`;
}

// 返信
await message.reply(reply);
```
````

---

## 天気予報を教えてくれるコマンドを作ってみる

`!weather`と送ると、それぞれの日の天気が表示されるようになります。

![](./images/bot_weather2.png)

`"forecasts"`の中には、天気以外にも最高・最低気温や降水確率などの情報も含まれています。
それらの情報を表示してもいいですし、`!weather <都市ID>`のように指定した都市の天気を表示するようにしても面白いと思います。
天気に応じた絵文字を表示するのもいいですね ☀️☁️🌧️

---

## まとめ

本講座では、Discord Botを作成しながらJavaScriptの基本的な文法を学びました。

`if`文や`for`文は他の言語でも使われる基本的な文法ですので、他の言語を学ぶ際にも役立ちます。

また、APIを使って外部のデータを取得する方法も学びました。
APIを使うことで、様々なデータを取得して自分のプログラムに組み込むことができます。

今回のプログラムを応用していくことで、面白いBotや便利なツールを作ることができます。
ぜひ、色々なアイデアを考えてみてください。
