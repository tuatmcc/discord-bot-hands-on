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

  if (message.content === "!ping") {
    await message.reply("pong!");
    return;
  }

  if (message.content.startsWith("!janken")) {
    // じゃんけんの手
    const hands = ["グー", "チョキ", "パー"];

    // メッセージを空白で分割
    const args = message.content.split(" ");
    // ユーザーが選んだ手
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

    // 勝敗を判定
    if (userHand === choice) {
      await message.reply(
        `あなた: ${userHand}\nわたし: ${choice}\nあいこです！`
      );
      return;
    } else if (
      (userHand === "グー" && choice === "チョキ") ||
      (userHand === "チョキ" && choice === "パー") ||
      (userHand === "パー" && choice === "グー")
    ) {
      await message.reply(
        `あなた: ${userHand}\nわたし: ${choice}\nあなたの勝ち！`
      );
      return;
    } else {
      await message.reply(
        `あなた: ${userHand}\nわたし: ${choice}\nあなたの負け！`
      );
      return;
    }
  }
});

client.login(process.env["DISCORD_BOT_TOKEN"]);
