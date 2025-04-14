// ライブラリのインポート
import { Client } from "discord.js";

// クライアントを作成
const client = new Client({
  // Botの動作に必要な権限を指定
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});

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

  // 受信したメッセージが"!ping"なら
  if (message.content === "!ping") {
    // "pong!"と返信
    await message.reply("pong!");
    // 処理終了
    return;
  }

  // 受信したメッセージが"!janken"から始まっていたら
  if (message.content.startsWith("!janken")) {
    // じゃんけんの手
    const hands = ["グー", "チョキ", "パー"];

    // メッセージを空白で分割してユーザーの手を取得
    const args = message.content.split(" ");
    const userHand = args[1];
    if (!hands.includes(userHand)) {
      // 引数が指定されていない場合はエラーを表示して終了
      await message.reply("グー、チョキ、パーのいずれかを指定してください。");
      return;
    }

    // 0〜2のランダムな整数を生成
    const choiceIndex = Math.floor(Math.random() * hands.length);
    // 選んだ手を取得
    const choice = hands[choiceIndex];

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

  // 受信したメッセージが"!weather"なら
  if (message.content === "!weather") {
    // 天気予報APIにGETリクエストを送る
    const url = "https://weather.tsukumijima.net/api/forecast/city/130010";
    const response = await fetch(url);
    // エラーの場合はエラーメッセージを表示して終了
    if (!response.ok) {
      await message.reply("天気情報を取得できませんでした。");
      return;
    }
    // レスポンスをJSON形式に変換
    const data = await response.json();

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
  }
});

// Botを起動
client.login(process.env["DISCORD_BOT_TOKEN"]);
