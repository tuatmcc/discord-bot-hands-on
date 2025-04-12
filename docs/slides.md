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

---

## 環境構築

今回使用するプログラミング言語はJavaScriptです。
JavaScriptは元々Webブラウザで動く言語でしたが、Node.jsの登場により今では様々な用途で使われています。

ということで、JavaScriptを動かすための環境を構築していきましょう！

- VSCodeのインストール
- Gitのインストール
- miseのインストール

---

### VSCodeのインストール

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

### Gitのインストール

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

## ソースコードの準備

今回使用するソースコードはGitHubに公開で公開しています。
