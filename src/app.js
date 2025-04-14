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
});

// Botを起動
client.login(process.env["DISCORD_BOT_TOKEN"]);
