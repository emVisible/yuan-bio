export interface SeoPage {
  slug: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  keywords: string[];
  contentZh: string;
  contentEn: string;
}

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "chinese-marriage-biodata-template",
    titleZh: "华人婚恋简历模板 — 免费在线制作",
    titleEn: "Chinese Marriage Biodata Template — Free Online Maker",
    descriptionZh:
      "为海外华人设计的婚恋简历模板大全：9 种简历版式 + 9 种卡片版式，中英双语，免费导出 PDF 与 PNG，5 分钟完成，适合相亲论坛、微信群与社交平台分享。",
    descriptionEn:
      "Complete marriage biodata templates for overseas Chinese: 9 resume layouts + 9 card designs, bilingual, free PDF and PNG export in minutes—ideal for forums, WeChat groups, and social sharing.",
    keywords: ["chinese marriage biodata", "华人婚恋简历", "相亲简历模板"],
    contentZh: `在海外华人社区，相亲往往从一份「简历」开始。不同于欧美 dating app 里寥寥数行的个人简介，华人相亲更习惯用结构化的婚恋简历（biodata）：基本信息、教育职业、家庭背景、自我介绍和择偶期望，配上照片，发给父母、朋友、红娘或相亲群。一份排版清晰、信息完整的简历，往往决定了对方是否愿意进一步了解你。

**什么是华人婚恋简历？**

婚恋简历源自南亚与华人社区的相亲传统，近年随海外华人社群扩散至北美、澳洲、加拿大、欧洲等地。它介于「工作简历」与「征友帖」之间：比工作简历更有人情味和家庭维度，比社交软件简介更正式、更便于长辈阅读与转发。

> 好的婚恋简历不是炫耀履历，而是让对方在三五分钟内看见一个真实、得体、有结婚诚意的你。

**一份好的婚恋简历应该包含什么？**

1. **基本信息**：姓名（可用化名或「某先生/女士」）、性别、出生年份、身高、体重（可选）、现居城市、籍贯
2. **教育与职业**：最高学历、毕业院校、专业方向、行业领域、职位层级（不必写具体公司名，保护隐私）
3. **家庭背景**：父母职业与健康状况、兄弟姐妹情况、家庭经济概况（华人家庭高度重视）
4. **个人状况**：婚姻史、有无子女、宗教信仰（如适用）、房产车产（可写「有/无」不必写具体地址）
5. **自我介绍**：性格、价值观、生活方式、爱好（建议 150–400 字）
6. **择偶期望**：年龄范围、身高、学历、地域、性格与价值观（具体但不过分苛刻）
7. **联系方式**：微信、邮箱或电话（按隐私需求选择性公开）

**常见误区与改进建议**

- 写得太像工作简历，通篇罗列成就，缺少「人」的温度——加入生活细节与情感态度
- 择偶期望过于笼统（「善良就好」）或列了十几条硬性标准——保留 3–5 条可量化条件 + 2–3 条价值观
- 照片过于随意（旅游抓拍、滤镜过重）——选半身正装或 smart casual，面部清晰、背景干净
- 家庭背景一笔带过或完全省略——在华人语境里，家庭信息是建立信任的重要一环
- 联系方式写错或长期不回复——确保微信能通过好友验证，并说明方便联系的时间段

**缘简 YuanBio 提供的 9 种简历模板**

缘简（YuanBio）是专为海外华人设计的免费婚恋简历制作工具，提供 **9 种简历模板**，风格各异，可按受众与场景选择：

- **简约**：留白多、信息清晰，适合首次发帖或发给同龄朋友
- **红韵**：红金典雅配色，深受父母辈与长辈亲戚喜爱
- **现代**：简洁几何排版，适合硅谷、多伦多等年轻职场人群
- **典雅**：衬线字体与精致边框，适合正式介绍与打印
- **古风**：宣纸墨色、双线框饰，端正有仪式感
- **杂志**：色块分区、杂志式排版，信息层次丰富
- **时间线**：左侧色带 + 时间线布局，适合经历较多的申请者
- **职场**：偏商务简历结构，适合金融、咨询、法律等行业
- **暖色**：暖色纸张质感，柔和易读，适合性格温和、重视家庭的表述

此外还有 **9 种卡片模板**（横版/竖版），适合做成朋友圈配图、小红书封面或私信首图，与完整 PDF 简历配合使用。

**制作与导出：完全免费**

使用缘简在线制作，无需注册，所有数据保存在你的浏览器本地，不上传服务器。填完信息后可免费预览，并免费导出 **PDF**（适合微信转发、论坛附件、打印）或 **PNG**（适合社交平台配图）。没有隐藏收费，没有「付费去水印」——全部功能免费使用。

**实用范例：基本信息怎么写**

> 张女士，1993 年生，身高 165cm，现居加州旧金山湾区。籍贯江苏南京。美国硕士毕业，从事生物医药研发。未婚，无子女。父母均已退休，身体健康，有一个弟弟在美国读博。

注意：不必写具体门牌号；收入可写区间或「稳定」；签证身份建议在海外场景中注明（如绿卡、公民、工签）。

**实用范例：自我介绍片段**

> 性格上我偏内敛稳重，做事有计划，也享受生活中的小确幸。周末喜欢徒步、逛博物馆、尝试新菜谱，不抽烟，偶尔小酌。重视家庭，希望婚后能与双方父母保持适度联系。未来 3–5 年计划在湾区定居，欢迎愿意一起经营平淡而温暖家庭的你。

**发布前检查清单**

- 核心字段无错别字（尤其是出生年份、身高、城市名）
- 照片与文字描述一致，无过度美颜
- 择偶期望与自身条件大致匹配，避免「高攀感」或「过低定位」
- 已征得父母同意（若由父母代发）
- PDF 在手机上打开清晰可读，文件大小建议 2MB 以内

无论你是第一次相亲，还是帮家人整理资料，都可以打开缘简，选一款模板，五分钟做出一份得体、专业的华人婚恋简历。`,
    contentEn: `In overseas Chinese communities, matchmaking often begins with a structured biodata—not a short dating-app bio. Families, friends, matchmakers, and WeChat groups expect clear sections: basics, education, career, family background, about me, partner expectations, and often a photo. A well-formatted profile can determine whether someone takes the next step to meet you.

**What is a Chinese marriage biodata?**

Marriage biodata draws from South Asian and Chinese matchmaking traditions and has spread with diaspora communities across North America, Australia, Canada, and Europe. It sits between a job resume and a casual personal ad: more formal and family-oriented than a Tinder bio, warmer and more personal than a CV.

> A strong biodata does not boast—it lets someone see a genuine, respectful, marriage-minded person in a few minutes.

**What to include**

1. **Basics**: name (or alias), gender, birth year, height, optional weight, current city, hometown
2. **Education & career**: degree, school, field, industry, seniority (skip exact employer for privacy)
3. **Family**: parents' occupations and health, siblings, general household background
4. **Personal status**: marital history, children, religion if relevant, property (yes/no without addresses)
5. **About me**: personality, values, lifestyle, hobbies (150–400 words)
6. **Partner expectations**: age, height, education, location, values—specific but reasonable
7. **Contact**: WeChat, email, or phone as privacy allows

**Common mistakes**

- Reading like a job resume with no warmth—add daily-life details and relationship outlook
- Vague expectations ("kind is enough") or a laundry list of demands—use 3–5 measurable criteria plus 2–3 values
- Casual or over-filtered photos—use a clear half-body shot, smart casual or formal
- Skipping family background—critical for trust in Chinese matchmaking culture
- Wrong contact info or slow replies—verify WeChat and note when you are reachable

**Nine resume templates on YuanBio**

YuanBio (缘简) is a free biodata maker for overseas Chinese with **9 resume templates**:

- **Minimal (简约)**: clean whitespace, great for first posts or peers
- **Traditional (红韵)**: red-and-gold classic style favored by parents and elders
- **Modern (现代)**: geometric layout for younger professionals in tech hubs
- **Elegant (典雅)**: serif fonts and refined borders for formal introductions
- **Classic (古风)**: parchment tones and double-line frames, ceremonial feel
- **Magazine (杂志)**: color blocks and editorial layout, rich hierarchy
- **Timeline (时间线)**: left color band and timeline for longer histories
- **Corporate (职场)**: business-resume structure for finance, consulting, law
- **Warm (暖色)**: warm paper texture, soft and readable

There are also **9 card templates** for social images—pair them with a full PDF for WeChat, Xiaohongshu, or forum posts.

**Free export—no signup**

Build your biodata online with YuanBio. No account required; data stays in your browser. Preview free, then export **PDF** (WeChat, forums, printing) or **PNG** (social graphics). No paywalls, no paid watermark removal—everything is free.

**Sample basics block**

> Ms. Zhang, born 1993, 165 cm, based in the San Francisco Bay Area. From Nanjing, Jiangsu. U.S. master's degree, biotech R&D. Never married, no children. Parents retired and healthy; one younger brother in PhD program in the U.S.

**Sample About Me excerpt**

> I am steady and thoughtful, enjoy small rituals in daily life. Weekends: hiking, museums, cooking experiments. Non-smoker, occasional wine. I value family and hope to stay connected with both sides' parents after marriage. Planning to settle in the Bay Area for the next 3–5 years—looking for someone who wants a calm, warm home together.

**Pre-publish checklist**

- No typos in birth year, height, or city
- Photo matches description; avoid heavy beauty filters
- Expectations align with your profile—neither unrealistic nor self-deprecating
- Parent approval if they are circulating the file
- PDF readable on mobile; keep under ~2 MB

Open YuanBio, pick a template, and create a professional Chinese marriage biodata in about five minutes.`,
  },
  {
    slug: "overseas-chinese-dating-profile",
    titleZh: "海外华人相亲简历怎么写",
    titleEn: "How to Write an Overseas Chinese Dating Profile",
    descriptionZh:
      "北美、澳洲、加拿大、欧洲华人相亲简历写作全指南：地域差异、签证身份、家庭期待与排版技巧，配合缘简免费模板快速导出 PDF。",
    descriptionEn:
      "Complete guide for overseas Chinese matchmaking profiles across North America, Australia, Canada, and Europe—regional tips, visa context, family expectations, and free YuanBio templates.",
    keywords: ["海外华人相亲", "overseas chinese dating", "北美相亲"],
    contentZh: `海外华人相亲有独特的语境：你可能在硅谷做工程师，父母在老家，相亲信息要在「显得成功」和「显得真诚」之间找平衡；你可能持工签、刚拿绿卡，或已是二代 ABC，面对的对象可能是同城留学生、异地同乡，或国内亲戚介绍的候选人。同一份资料，既要让长辈觉得「靠谱」，也要让同龄人觉得「好聊」——这就是海外华人婚恋简历的写作难点。

**海外华人相亲 vs 本地 dating culture**

在北美或澳洲，主流约会文化强调个人选择与轻松交往；华人家庭网络里的相亲则更早进入「结婚可能性」评估：学历够不够、工作稳不稳、家庭背景如何、能不能在一个城市生活、要不要孩子、以后回不回国。简历需要诚实回答这些隐性考题，同时保持礼貌与分寸。

> 海外简历的核心矛盾：英文世界里的你，和中文家庭叙事里的你，应该是同一个人，只是表达方式不同。

**地域差异：写进简历里的「隐形字段」**

- **美国**：常注明签证身份（公民/绿卡/H1B/OPT 等）、是否愿意回国发展、东西海岸或中部定居偏好。湾区、西雅图、纽约、波士顿等城市圈建议在现居地写清楚
- **加拿大**：PR/公民、英语与法语能力、多伦多 vs 温哥华 vs 蒙特利尔定居意向。华人社区活跃，同城介绍很常见
- **澳洲/新西兰**：强调生活方式（户外、海滩文化）、移民年限、工签/PR 状态、是否要孩子。悉尼、墨尔本、布里斯班写法可略有侧重
- **欧洲**：语言能力（当地语 + 英语）、长期定居意向、是否接受跨国异地恋。德法荷北欧华人圈子较小，信息完整度更重要
- **英国**：签证类型（工签、永居、公民）、伦敦 vs 其他城市，金融/学术/创意行业表述习惯不同

**签证与身份：怎么写才得体**

不必在公开帖里写签证细节，但在给介绍人、父母或私信对象的 PDF 简历里，建议用一句话说明，减少后期误会：

> 美国绿卡持有者，长期计划在加州发展，每年回国探亲 1–2 次。

若身份仍在办理中，可写「工签稳定，公司支持绿卡流程」，避免过度承诺回国或定居时间。

**家庭维度：海外华人不可省略的一节**

父母职业、是否退休、兄弟姐妹去向、是否与父母同住或定期视频——这些在欧美简历里很少出现，在华人相亲里却常是首轮筛选条件。写法宜客观中性：

> 父亲工程师已退休，母亲教师在职，均身体健康。独生子女，与父母保持每周联系，重大决定会征求家人意见，但婚恋选择由本人做主。

既尊重家庭，也表明独立决策，减少「妈宝」或「脱离家庭」的误读。

**写作技巧：用细节代替空泛形容词**

与其说「性格开朗」，不如说「熟人会说我好相处，喜欢小型聚会多于大型夜店」。与其说「事业有成」，不如说「在科技公司做产品经理五年，工作稳定，有业余时间发展爱好」。择偶期望建议结构：

1. 年龄与身高范围
2. 学历与职业方向（可写「本科及以上，有稳定工作」）
3. 地域（同城优先 / 接受异地但需明确见面频率）
4. 性格与生活方式（2–3 条）
5. 家庭与婚姻观（要不要孩子、与父母关系期待）
6. 底线（如不接受吸烟、不接受无结婚诚意交往）

**不同渠道的简历长度**

- **微信群一句话**：20–40 字 + PDF 附件
- **论坛帖**：200–500 字概括 + 私信发完整 PDF
- **小红书/Instagram**：故事化短帖 + 评论私信发简历
- **父母转发亲戚**：完整 PDF，建议红韵或典雅模板

**缘简 YuanBio 如何帮你省时**

缘简提供 9 种简历模板与 9 种卡片模板，中英界面切换，浏览器本地填写，免费导出 PDF 与 PNG。使用缘简在线制作，可把精力花在内容与照片上，而不是排版。现代、职场、简约适合同龄人；红韵、典雅、古风适合长辈圈；杂志、时间线适合信息较多的申请者。

**发布礼仪**

- 经本人（及父母）同意后再群发
- 不公开他人隐私（勿附对方未授权照片）
- 礼貌回复每一条认真介绍，即使不合适也简短致谢
- 定期更新年龄、城市、职业变动，避免旧简历流传

海外华人相亲是跨文化、跨时区的长期项目。一份诚实、完整、排版专业的简历，是你给未来伴侣和家庭的第一份见面礼。`,
    contentEn: `Overseas Chinese matchmaking has a distinct context: you may be an engineer in Silicon Valley while parents back home circulate your file; you may be on a work visa, a new green-card holder, or second-generation ABC. The same biodata must feel credible to elders and approachable to peers—that is the core writing challenge.

**Overseas Chinese matchmaking vs local dating culture**

Mainstream dating in North America or Australia emphasizes casual choice and exploration. Family-network introductions often evaluate marriage potential early: education, job stability, family background, city compatibility, children plans, and China ties. Your biodata should answer these implicit questions honestly and tactfully.

> The overseas biodata tension: the English-speaking you and the Chinese family narrative should be the same person, expressed differently.

**Regional differences**

- **United States**: visa status (citizen/GC/H1B/OPT), willingness to relocate to China, coast vs Midwest. Name the metro: Bay Area, Seattle, NYC, Boston
- **Canada**: PR/citizenship, English/French, Toronto vs Vancouver vs Montreal
- **Australia/NZ**: lifestyle, years in country, visa/PR, children plans; Sydney, Melbourne, Brisbane nuance
- **Europe**: local language + English, long-term settlement, tolerance for distance
- **UK**: visa type, London vs other cities, industry norms in finance/academia/creative fields

**Visa and identity—tactful disclosure**

Skip visa detail in public posts; in PDFs for matchmakers or parents, one line prevents surprises:

> U.S. green-card holder; long-term plans in California; visits China 1–2 times per year.

If status is in process: "Stable work visa; employer supports green-card petition"—avoid over-promising timelines.

**Family section—non-negotiable in Chinese context**

Parents' jobs, retirement, siblings, contact frequency—rare on Western resumes, common in Chinese introductions:

> Father (retired engineer) and mother (working teacher) are healthy. Only child; weekly calls with parents; I make my own marriage decision with family input.

**Replace adjectives with specifics**

Not "outgoing"—"I prefer small dinners over clubs." Not "successful"—"Five years as a product manager, stable schedule for hobbies." Structure partner expectations:

1. Age and height range
2. Education and career stability
3. Location and distance rules
4. Lifestyle and personality (2–3 items)
5. Family and children outlook
6. Clear boundaries (non-smoker, marriage-minded only)

**Length by channel**

- WeChat one-liner: 20–40 characters + PDF
- Forum post: 200–500 word summary + DM PDF
- Xiaohongshu/IG: story post + biodata in DMs
- Parent forwarding: full PDF; Traditional (红韵) or Elegant (典雅) templates

**YuanBio workflow**

Nine resume and nine card templates, bilingual UI, local browser storage, free PDF/PNG export. Use YuanBio online so effort goes to content and photos, not layout. Modern, Corporate, Minimal for peers; Traditional, Elegant, Classic for elders; Magazine, Timeline for richer profiles.

**Etiquette**

- Circulate only with consent
- Never share others' photos without permission
- Reply courteously to serious intros
- Refresh age, city, and job when they change

Overseas Chinese matchmaking spans cultures and time zones. A honest, complete, well-designed biodata is your first gift to a future partner and both families.`,
  },
  {
    slug: "chinese-american-marriage-biodata-pdf",
    titleZh: "华裔美国人婚恋简历 PDF 下载",
    titleEn: "Chinese American Marriage Biodata PDF Download",
    descriptionZh:
      "ABC、华裔美国人制作中英双语相亲简历 PDF 的完整指南：双语排版、照片规范、家庭介绍话术与免费导出步骤，适配父母转发与本地社交场景。",
    descriptionEn:
      "Complete guide for ABC and Chinese Americans to create bilingual marriage biodata PDFs—layout tips, photo rules, family wording, and free export for parents and local sharing.",
    keywords: ["chinese american biodata", "ABC dating profile", "华裔相亲"],
    contentZh: `华裔美国人（ABC，American-Born Chinese）在相亲时常常面临双语场景：父母希望看到中文简历发给国内或华人社区的亲戚，你自己可能需要在英文环境或混合朋友圈里介绍自己；你或许听得懂粤语、普通话，但读写中文简历并不熟练；又或者你中文流利，却希望关键字段有英文对照，方便非中文背景的家人理解。一份中英双语、排版专业的 PDF 婚恋简历，是 ABC 群体最实用的解决方案。

**ABC 相亲的三个典型场景**

1. **父母主导**：父母在国内或华人社区拿到候选人资料，也需要把你的资料「发回去」。中文为主、英文标签的 PDF 最合适
2. **华人朋友牵线**：在湾区、纽约、洛杉矶等同乡会、教会、校友群里，中英文混杂，PDF 附件比长微信文字更正式
3. **跨文化家庭**：一方父母只说英文，另一方只说中文，双语简历减少误会与反复解释

**建议结构：中文主体 + 英文对照**

- **页眉**：中英文姓名（如 David Chen / 陈晓东）、出生年份、城市（San Francisco / 旧金山）
- **字段标签**：左侧或表头用「身高 Height」「学历 Education」双语标注
- **自我介绍**：中文段落完整表达；段末附 2–4 句英文 summary
- **家庭背景**：中文详写；英文可简写父母 occupation 与 siblings
- **照片**：半身照，面部清晰，背景中性；避免夜店、健身房镜面自拍

> 英文 summary 示例：Software engineer in SF, UC grad, family-oriented, seeking a kind, career-driven partner open to Bay Area life.

**语言与文化：ABC 简历的微妙平衡**

不必为「中文不够书面」焦虑——真诚、清楚比辞藻更重要。若父母帮忙润色，务必自己通读确认事实无误。避免：

- 中文过于文言，同龄人觉得疏离
- 英文过于 slang，长辈觉得不正经
- 中美收入、房产表述夸大（用区间或定性描述更安全）

**身份与职业怎么写**

ABC 常遇「你是不是中国人」的隐性提问。可委婉写籍贯与父母背景，强调「在美国成长、重视华人家庭价值」：

> 出生于加州，父母早年从台湾移民，在家说中文，重视传统节日与家庭聚餐。本人美国本科，现于金融科技公司任职。

职业写行业与职能即可，不必附 LinkedIn；签证通常不是问题（公民或出生即公民），但若持其他身份应如实注明。

**模板选择建议**

- 给国内亲戚：**红韵**、**典雅**、**古风**——长辈熟悉红金与正式版式
- 给同龄华人朋友：**现代**、**简约**、**杂志**
- 职场校友圈：**职场**、**时间线**
- 社交媒体首图：缘简 **9 种卡片模板** 导出 PNG，再附 PDF 详情

**PDF 制作与免费导出**

使用缘简在线制作，浏览器填写，无需注册。选好模板后一键免费导出 PDF，也可导出 PNG 做配图。数据不上传服务器，修改方便。导出前在手机预览：字号是否够大、照片是否裁切过度、中英文是否对齐。

**常见 ABC 家庭沟通话术**

向父母要信息时可说：「我需要你们的职业和老家，写进简历里介绍给对方家长，不会写具体地址。」向父母解释简历时可说：「这是华人相亲标准格式，不是找工作，但要比朋友圈帖子正式。」

**检查清单**

- 中英文姓名、年份、城市一致
- 身高用 cm，体重可选 kg
- 择偶期望无互相矛盾条目
- 已与父母确认可公开的家庭信息
- PDF 文件名礼貌：如「陈晓东_婚恋简历_2025.pdf」

华裔美国人的身份是优势而非障碍——双语、双文化、双社群。用缘简做一份得体 PDF，让父母放心转发，也让对方第一眼就看见你的诚意与专业。`,
    contentEn: `Chinese Americans (ABC) often need biodata that works in two languages: Chinese for parents and relatives in diaspora networks, English or bilingual labels for mixed friend circles. You may speak Cantonese or Mandarin fluently but rarely write formal Chinese—or you write Chinese well but need English for in-laws. A polished bilingual PDF is the most practical format.

**Three common ABC scenarios**

1. **Parent-led**: parents exchange candidates in Chinese communities; Chinese-primary PDF with English labels works best
2. **Friend introductions**: alumni, church, or regional groups in Bay Area, NYC, LA—PDF beats long WeChat text
3. **Cross-cultural families**: one side English-only, one side Chinese-only—bilingual fields reduce friction

**Structure: Chinese body + English support**

- **Header**: David Chen / 陈晓东, birth year, San Francisco / 旧金山
- **Labels**: bilingual—身高 Height, 学历 Education
- **About me**: full Chinese paragraph + 2–4 sentence English summary at end
- **Family**: detailed in Chinese; concise English for parents' jobs and siblings
- **Photo**: half-body, neutral background, no club or gym mirror shots

> English summary example: Software engineer in SF, UC grad, family-oriented, seeking a kind, career-driven partner open to Bay Area life.

**Language and culture balance**

Authenticity beats literary Chinese. If parents polish text, verify facts yourself. Avoid overly classical Chinese (peers feel distance), heavy slang in English (elders feel informal), or inflated property/income claims—use ranges or qualitative wording.

**Identity and career**

Address implicit questions gently via hometown and parents' immigration story:

> Born in California; parents immigrated from Taiwan early; Chinese spoken at home; value holidays and family meals. U.S. undergrad; fintech professional.

Citizenship usually needs no emphasis; other statuses should be stated honestly.

**Template picks**

- Relatives in China: **Traditional (红韵)**, **Elegant (典雅)**, **Classic (古风)**
- Peers: **Modern (现代)**, **Minimal (简约)**, **Magazine (杂志)**
- Professional circles: **Corporate (职场)**, **Timeline (时间线)**
- Social teaser: **9 card templates** as PNG plus PDF details

**Free PDF export with YuanBio**

Build online—no signup, data stays in browser. Free PDF and PNG export, mobile preview before sharing. Filename example: David_Chen_Biodata_2025.pdf.

**Checklist**

- Matching names, years, cities across languages
- Height in cm; consistent units
- Non-contradictory partner expectations
- Parent-approved family details
- Mobile-readable PDF under ~2 MB

Being ABC is an asset—bilingual, bicultural, dual networks. YuanBio helps you ship a PDF parents proudly forward and matches read with confidence.`,
  },
  {
    slug: "how-to-write-about-me-marriage-biodata",
    titleZh: "婚恋简历自我介绍怎么写",
    titleEn: "How to Write About Me for Marriage Biodata",
    descriptionZh:
      "相亲简历「自我介绍」与「择偶期望」深度写作指南：三段式结构、真实范例、避雷清单与润色技巧，配合缘简各模板字段直接填写导出。",
    descriptionEn:
      "In-depth guide to About Me and partner expectations—three-part structure, real examples, pitfalls, and polish tips, with YuanBio templates ready to fill and export.",
    keywords: ["自我介绍 相亲", "about me biodata", "择偶期望"],
    contentZh: `自我介绍是婚恋简历的灵魂。招聘简历证明你能做什么，婚恋简历则要让人感受到你是怎样的人、想过怎样的生活、期待怎样的伴侣。很多人卡在「不知道怎么说自己」——要么写成干巴巴的标签罗列，要么写成过长的小作文。本文给你可套用的结构、范例与修改方法，填进缘简各模板即可免费导出 PDF。

**为什么自我介绍比学历更重要？**

介绍人转发的简历，收件人往往先扫年龄身高职业，然后直接跳到「自我介绍」和「择偶期望」。学历可以验证，自我介绍却决定情绪共鸣：对方能否想象和你一起吃饭、旅行、见父母、处理分歧。好的自我介绍 = 具体细节 + 真实语气 + 未来导向，而不是形容词堆砌。

**推荐结构：三段式（约 200–400 字）**

1. **我是谁**（2–4 句）：职业阶段、性格关键词、生活城市与状态
2. **我的生活**（3–5 句）：爱好、社交方式、周末节奏、健康习惯
3. **我寻找什么**（2–4 句）：关系观、家庭观、未来 3–5 年规划

三段之间用空行分隔，方便手机阅读。缘简模板中「自我介绍」字段支持多段文字，直接按此结构输入即可。

**范例一：理工科女生（简约/现代模板）**

> 我在西雅图做数据科学相关工作，硕士毕业三年，性格偏安静踏实，熟人会说我靠谱好沟通。工作日规律健身、看书，周末喜欢徒步或探店咖啡馆。不抽烟，酒量很浅。重视承诺，希望感情以结婚为前提认真发展。未来希望在太平洋西北地区定居，愿意与伴侣一起规划财务与家庭节奏，也期待能保留各自的爱好与朋友圈。

**范例二：金融男生（职场/典雅模板）**

> 多伦多从事风险管理，工作稳定但不过度加班。性格外向适度，喜欢组织朋友小聚，也享受独处看电影。父母在国内，每年回国两次，重视孝道但独立生活多年。寻找性格开朗、有稳定职业、愿意在加国长期发展的伴侣，希望能互相支持事业与家庭，1–2 年内有结婚计划。

**择偶期望：可执行而非许愿**

把期望分成「硬条件」与「软偏好」：

- **硬条件**（3–5 条）：年龄区间、最低身高、学历底线、地域、不接受吸烟等
- **软偏好**（2–3 条）：喜欢运动、重视家庭、愿意沟通、有幽默感

> 硬条件示例：1988–1996 年生，身高 170cm 以上，本科及以上，现居或愿意移居澳洲东部海岸。

> 软偏好示例：性格温和，愿意一起规划未来，能接受双方父母适度参与家庭生活。

避免「必须富二代」「颜值 8 分以上」等引发反感的表述；财富与外貌可写为「家庭经济稳定」「形象得体」。

**语气避雷**

- 避免负面开场：「受够了 dating apps 渣男渣女」——换成「希望认真走向婚姻」
- 避免过度谦虚：「我条件一般配不上」——换成客观描述 + 真诚态度
- 避免夸大：「年薪百万」「人脉极广」——除非愿意在面试式见面时被验证
- 避免空泛：「善良、上进、有责任心」——几乎人人会写，改为行为例子

**与照片、其他字段一致**

自我介绍写「热爱户外」，照片不宜全是室内自拍；写「低调内敛」，择偶期望却列十条炫富条件，会削弱信任。家庭背景、婚姻史字段与自我介绍语气也要统一——再婚者不必在自我介绍里隐瞒，可简短坦诚后强调当下与未来。

**英文双语场景**

若简历中英对照，中文自我介绍后附简短英文：

> I value honesty, steady career growth, and building a warm home. Looking for a marriage-minded partner to grow together in the Bay Area.

**修改流程：写 → 放一夜 → 删 30% 形容词 → 念给朋友说**

念出声能发现拗口句子和不自然排比。删形容词后保留动词与场景：不是「热爱生活」，而是「周末常去农夫市场做菜招待朋友」。

**缘简使用提示**

缘简 9 种简历模板均含自我介绍与择偶期望字段，浏览器本地保存，随时修改，免费导出 PDF/PNG。可先选 **暖色** 或 **简约** 草稿填写，定稿后换 **红韵** 给父母版——内容可复用，仅换模板。

自我介绍没有标准答案，但有更好答案：更具体、更诚实、更尊重读者时间。花 20 分钟写好这两段，胜过随便贴一张资料表。`,
    contentEn: `About me is the soul of marriage biodata. A job resume proves what you do; biodata should convey who you are, how you live, and what partnership you want. Many people stall—either bullet adjectives or a memoir. This guide gives structure, samples, and edits you can paste into YuanBio templates and export free as PDF.

**Why About me beats credentials alone**

After age and job, readers jump to About me and expectations. Degrees are verifiable; tone and detail drive resonance—can they imagine meals, trips, family visits, and conflict with you? Strong copy = specifics + honest voice + forward look, not adjective stacks.

**Three-part structure (200–400 words)**

1. **Who I am** (2–4 sentences): career stage, personality, city and life stage
2. **My life** (3–5 sentences): hobbies, social style, weekends, health habits
3. **What I seek** (2–4 sentences): relationship view, family view, 3–5 year plan

Use paragraph breaks for mobile reading. YuanBio About me fields support multi-paragraph input.

**Sample 1: tech woman (Minimal/Modern)**

> I work in data science in Seattle, three years post-master's, quiet and reliable according to friends. Weekdays: gym and reading; weekends: trails or café hopping. Non-smoker, light drinker. I want dating aimed at marriage. Planning to stay in the Pacific Northwest—seeking a partner to plan finances and home life together while keeping personal hobbies and friendships.

**Sample 2: finance man (Corporate/Elegant)**

> Risk management in Toronto, stable hours. Outgoing in moderation—small friend dinners plus solo movies. Parents in China; visit twice a year; filial but independent for years. Seeking cheerful partner with stable career, long-term Canada plans, mutual support for career and family, marriage within 1–2 years.

**Partner expectations: actionable, not wishes**

Split **hard criteria** (3–5): age band, minimum height, education floor, location, non-smoker

**Soft preferences** (2–3): active lifestyle, family-minded, communicative, humor

Avoid insulting demands ("must be rich," "8/10 looks"). Use "financially stable household," "presentable appearance."

**Tone pitfalls**

- No bitter openers about apps—say "marriage-minded"
- No self-deprecation—objective facts + sincere intent
- No unverifiable boasts—unless you welcome scrutiny
- No generic virtue lists—use behaviors

**Stay consistent with photo and fields**

Outdoor lover? Do not use only indoor selfies. "Low-key" voice vs flashy demands erodes trust. Remarriage: brief honest history, then present and future focus.

**Bilingual add-on**

After Chinese paragraph, short English block:

> I value honesty, steady career growth, and building a warm home. Looking for a marriage-minded partner to grow together in the Bay Area.

**Edit workflow**

Draft → sleep → cut 30% adjectives → read aloud to a friend. Keep verbs and scenes: not "love life," but "farmers market cooking for friends on Sundays."

**YuanBio tip**

All nine resume templates include About me and expectations; local save; free PDF/PNG. Draft in Warm or Minimal, finalize in Traditional (红韵) for parents—same text, new layout.

There is no single perfect About me—only clearer, honester, more respectful ones. Twenty focused minutes beat a bare data sheet.`,
  },
  {
    slug: "marriage-biodata-for-parents",
    titleZh: "帮父母制作子女相亲简历",
    titleEn: "Marriage Biodata for Parents Helping Their Children",
    descriptionZh:
      "父母帮海外子女制作相亲简历的实操指南：该问子女哪些问题、哪些信息不宜代写、红韵典雅模板推荐与转发礼仪，缘简免费在线制作无需注册。",
    descriptionEn:
      "Practical guide for parents creating biodata for children abroad—what to ask, what not to write, Traditional/Elegant templates, sharing etiquette, free YuanBio online with no signup.",
    keywords: ["父母相亲简历", "子女婚恋资料", "traditional biodata"],
    contentZh: `许多海外华人的相亲简历，实际是父母起草、子女修改、亲戚转发的「家庭协作项目」。父母往往更熟悉国内相亲礼仪，也更知道长辈想看什么；子女则掌握真实职业、签证与城市生活细节。配合得当，父母制作的简历既体面又准确；配合不当，则可能出现信息过时、夸大收入、子女不知情被群发等尴尬。本指南帮父母高效出手，也帮子女温和设边界。

**父母参与的优势与风险**

优势：了解家族背景、亲戚网络、老家口碑；擅长选用 **红韵**、**典雅**、**古风** 等传统审美模板；转发给叔伯姑姨时更有说服力。

风险：职业头衔或收入未经子女确认；照片选用子女不喜欢的旧照；择偶标准写成父母理想而非子女意愿；在多个群重复发送造成隐私泄露。

> 黄金法则：父母起草，子女签字——核心事实必须经子女微信确认后再发。

**制作前：父母该问子女的 10 个问题**

1. 现居城市与是否愿意换城市？
2. 学历、学校、行业（能否写公司名？）
3. 身高体重、出生年份（务必核对）
4. 婚姻史与子女情况（如有）
5. 签证或公民身份（海外场景）
6. 收入能否写区间？写到什么程度？
7. 照片哪几张可以用？
8. 择偶年龄、身高、学历底线？
9. 最不能接受对方的哪几点？
10. 希望哪些信息不要出现在简历里？

把答案记在纸上，再打开缘简填写，避免边做边猜。

**各字段父母怎么写才得体**

**家庭背景**：父母可适当写细——「父亲退休教师，母亲家庭主妇，身体康健，家住某某市」不必写门牌号。兄弟姐妹职业与婚姻状况可写，体现家庭结构。

**教育与职业**：用子女原话，不要擅自拔高。「在互联网公司做技术」优于「高层管理」除非子女确认。海外公司可译成中文行业描述。

**自我介绍**：建议子女本人写第一版，父母润色语气；父母代写时用第三人称或子女口吻需统一，不要混用「我家孩子很优秀」与「我希望找……」。

**择偶期望**：以子女确认为准。父母常见过度条款（必须本地人、必须会做饭）应删减；可保留合理家庭期待如「重视孝道」「希望有稳定工作」。

**模板与版式建议**

- 发给国内长辈：**红韵**——红金喜庆，符合传统相亲审美
- 打印邮寄或正式介绍：**典雅**——衬线字体，端庄
- 年轻亲戚或二代华人：**暖色**、**简约**——柔和易读
- 经历较丰富（海归、博士、创业）：**时间线**、**杂志**

缘简提供 9 种简历模板与 9 种卡片模板，全部免费，浏览器填写，可导出 PDF 打印或微信传文件，也可导出 PNG 做朋友圈配图。

**隐私与边界**

- 不写具体住址、车牌、公司楼层
- 收入可写「稳定」或区间，避免精确数字引发攀比
- 未经同意不附子女身份证、护照、工资单截图
- 控制转发范围：亲戚群、可信介绍人，而非公开贴吧

**转发礼仪**

- 配一句简短介绍：「犬子/小女 32 岁，温哥华从事会计，性格稳重，诚心找对象，详细资料见附件。」
- PDF 文件名含姓名与「婚恋简历」，方便对方归档
- 对方回复后，先由父母筛一层，再安排子女加微信——尊重子女节奏
- 定期让子女更新版本，删除旧文件避免信息不符

**子女如何与父母协作（给父母看的说明）**

子女可对父母说：「用缘简在线制作很方便，您填好发我预览，我确认后再发亲戚。」建立固定更新频率，如每半年或职业变动时更新一次。

**常见父母疑问**

问：要不要写房车？答：可写「有房有车」或「租房有车」，不必附地址。

问：离异要不要写？答：建议坦诚一句，强调子女当下状态与未来诚意，隐瞒反而后期伤信任。

问：英文要不要？答：若介绍对象是海归或外籍华人，选缘简中英界面，加几句英文对照。

父母的爱常体现在「急着帮孩子找对象」。一份经子女确认、排版体面的简历，既是父母的面子，也是子女的底气。缘简免费、无需注册，适合父母在家慢慢填写，子女远程把关。`,
    contentEn: `For many overseas Chinese families, biodata is a parent-drafted, child-edited, relative-forwarded team project. Parents know etiquette and what elders expect; children know real jobs, visas, and daily life. Done well, the result is dignified and accurate; done poorly—stale info, inflated income, or broadcasts the child never approved.

**Parent strengths and risks**

Strengths: family narrative, relative networks, eye for **Traditional (红韵)**, **Elegant (典雅)**, **Classic (古风)** layouts.

Risks: unverified titles or pay, unwanted photos, parents' ideal partner not child's, repeated group shares leaking privacy.

> Golden rule: parents draft, child signs off—confirm facts on WeChat before sending.

**Ten questions parents should ask first**

1. Current city and relocation openness?
2. Degree, school, industry—employer name OK?
3. Height, weight, birth year—double-check
4. Marital history and children?
5. Visa or citizenship?
6. Income—range allowed?
7. Approved photos?
8. Partner age, height, education floors?
9. Deal-breakers?
10. What must stay private?

Note answers, then fill YuanBio—do not guess.

**Field-by-field tact**

**Family**: parents may elaborate occupations and health; no street addresses.

**Career**: child's exact wording—no upgraded titles.

**About me**: child writes first draft; parents polish tone; keep voice consistent.

**Expectations**: child's confirmed list—trim unreasonable parental clauses.

**Templates**

- Elders in China: **Traditional (红韵)**
- Formal print intros: **Elegant (典雅)**
- Younger relatives: **Warm (暖色)**, **Minimal (简约)**
- Richer histories: **Timeline (时间线)**, **Magazine (杂志)**

Nine resume and nine card templates—all free, browser-based, PDF for WeChat/print, PNG for social teasers.

**Privacy**

No addresses, plates, floor numbers; income as "stable" or range; no ID or pay stubs without consent; limit circles to trusted relatives and matchmakers.

**Sharing etiquette**

- Short cover line with age, city, profession, sincerity
- Filename: Name_Biodata_2025.pdf
- Parents filter replies before child adds WeChat
- Refresh semi-annually or after job moves

**FAQ**

Property: "owns home and car" without address.

Divorce: one honest line plus present focus.

English: bilingual labels if matching returnees or international Chinese.

Parental love often rushes to help. A child-approved, well-designed biodata protects everyone's dignity. YuanBio is free, no signup—ideal for parents at home with remote child review.`,
  },
  {
    slug: "wechat-marriage-profile-sharing",
    titleZh: "微信群相亲简历怎么发",
    titleEn: "Sharing Marriage Biodata on WeChat Groups",
    descriptionZh:
      "相亲群、家族群、同学群转发婚恋简历的格式、话术与礼仪详解：一句话介绍怎么写、PDF 与照片如何搭配、隐私保护与缘简免费导出技巧。",
    descriptionEn:
      "Format, scripts, and etiquette for sharing biodata in WeChat matchmaking, family, and alumni groups—one-liners, PDF/photo pairing, privacy, and free YuanBio export tips.",
    keywords: ["微信群相亲", "wechat biodata", "相亲帖"],
    contentZh: `微信群是海外华人相亲最高频的场景之一：家族群里的长辈接力介绍、同学群里的半玩笑半认真征友、专门相亲群里的周期性「互发资料」。与论坛长帖不同，微信强调快速浏览、文件转发、私聊跟进。掌握「一句话 + PDF + 可选照片」的组合，配合得体礼仪，能显著提高有效率回复率，同时保护隐私。

**三种常见微信群类型**

1. **家族/亲戚群**：长辈主导，重视 **红韵**、**典雅** 版式，语气偏正式，需父母与子女共同认可
2. **同学/老乡群**：同龄人为主，**现代**、**简约**、**暖色** 均可，一句话可稍轻松但仍礼貌
3. **相亲专用群**：信息密度高，竞争者多——第一句话要抓眼，PDF 要一目了然

**推荐发布组合**

1. **一句话介绍**（20–50 字）：性别、出生年份、身高、城市、职业方向、核心择偶点
2. **PDF 附件**：完整婚恋简历，方便有心人转发给合适对象
3. **照片**（可选）：单独发一张半身照，PDF 内可不含照片以保护隐私——若群成员较杂，建议照片仅私聊发送

> 一句话范例：男，1990 年，178cm，旧金山软件工程师，绿卡，寻性格开朗、愿在湾区发展的女生，诚心结婚。

> 一句话范例（女生）：女，1995 年，165cm，温哥华护士，PR，重视家庭，希望找善良有担当、计划在加定居的对象。

**PDF 技术细节**

- 文件大小建议 **2MB 以内**，避免老年机打不开
- 使用缘简导出 A4 PDF，字号适合手机竖屏阅读
- 文件名：建议「姓名_婚恋简历.pdf」，勿用「未命名.pdf」
- 发前自己用手机微信打开预览一遍

缘简在线制作完全免费，无需注册，支持 PDF 与 PNG 导出；可先导出 PNG 预览图发群里试探反响，再私信发完整 PDF。

**礼仪与节奏**

- **先发文字，再发文件**：避免文件孤零零弹出
- **@ 介绍人**：若是某长辈牵头发言，礼貌致谢
- **勿刷屏**：同一简历不要在十个群同一时间轰炸
- **回复私信**：即使不合适，也简短回复「感谢介绍，感觉不太合适，祝早日觅得良缘」
- **保护他人**：转发别人资料前务必取得授权

**隐私分级策略**

- **公开群可写**：年龄、身高、城市、职业方向、模糊行业描述
- **仅私信提供**：完整 PDF、半身照、具体公司类型、微信号
- **联系方式**：公开群不写微信号，通过介绍人拉群或私信交换

**话术模板：子女请父母代发**

> 各位长辈好，这是我更新的相亲资料 PDF，请方便时帮忙留意。联系方式在简历内，可先让介绍人联系我，谢谢！

**话术模板：本人发同学群**

> 冒个泡，认真找对象，附件是详细资料。若身边有合适朋友欢迎私信，不当众讨论细节啦，感谢！

**常见失误**

- 只发长语音不讲重点——长辈不便转发
- PDF 竖屏字太小——换缘简 **简约** 或 **暖色** 大字版式
- 择偶标准写「没要求」——显得不认真
- 简历年龄与去年不符——群友会截图传播

**与卡片模板配合**

缘简 9 种卡片模板可导出 PNG，做成九宫格首图，配文「详细资料请私信」，适合不想在群里直接挂 PDF 时引流私聊。

微信群相亲讲究「快、清、礼」。一句话让人想点开，PDF 让人敢转发，礼仪让人愿帮忙。用缘简五分钟做好 PDF，把尴尬留给不合适，把体面留给每一次介绍。`,
    contentEn: `WeChat groups are among the most common overseas Chinese matchmaking channels: family relays, alumni half-joking posts, dedicated dating groups with weekly biodata swaps. Unlike forum essays, WeChat favors quick scans, file forwards, and DM follow-ups. Master the "one-liner + PDF + optional photo" bundle with solid etiquette to improve serious replies while protecting privacy.

**Three group types**

1. **Family/relative groups**: elder-driven; **Traditional (红韵)** or **Elegant (典雅)**; formal tone; parent-child approval
2. **Alumni/hometown groups**: peers; **Modern**, **Minimal**, **Warm**; slightly relaxed but polite one-liner
3. **Dedicated matchmaking groups**: high competition—hook in line one; scannable PDF

**Recommended bundle**

1. **One-liner** (20–50 chars): gender, birth year, height, city, field, core partner ask
2. **PDF attachment**: full biodata for forwards
3. **Photo** (optional): separate half-body shot; omit from PDF if group is mixed—DM photos instead

> Sample: M, 1990, 178 cm, SF software engineer, GC, seeking cheerful partner open to Bay Area, marriage-minded.

> Sample: F, 1995, 165 cm, Vancouver nurse, PR, family-oriented, seeking kind, accountable partner planning to stay in Canada.

**PDF technical tips**

- Keep under **~2 MB**
- YuanBio A4 export tuned for mobile vertical reading
- Filename: Name_Biodata.pdf—not Untitled.pdf
- Preview in WeChat on your phone before sending

YuanBio is free, no signup, PDF and PNG export; teaser PNG in group, full PDF in DMs works well.

**Etiquette**

- Text before file attachment
- Thank the introducer if applicable
- No simultaneous spam across ten groups
- Decline politely in DMs
- Never forward others' files without permission

**Privacy tiers**

Public group: age, height, city, broad job—no photo, no WeChat ID

DM: full PDF, photo, direct contact

**Scripts**

To parents posting:

> Updated biodata PDF attached—kindly share if you know a match. Contact via introducer first—thank you!

To alumni group:

> Seriously looking—details in PDF. DM if you have a friend in mind; prefer not to debate in thread—thanks!

**Mistakes**

- Long voice notes without summary—hard to forward
- Tiny mobile text—try YuanBio **Minimal** or **Warm**
- "No requirements"—sounds unserious
- Stale age—screenshots circulate for years

Pair **9 card templates** as PNG teasers with "DM for PDF" copy when you want less public exposure.

WeChat matchmaking rewards speed, clarity, and courtesy. YuanBio helps you ship a PDF in minutes so introducers can help with confidence.`,
  },
  {
    slug: "1point3acres-dating-post-template",
    titleZh: "一亩三分地相亲帖模板",
    titleEn: "1Point3Acres Dating Post Template",
    descriptionZh:
      "一亩三分地 Life 版相亲帖标准格式、标题范例、隐私写法与婚恋简历 PDF 配合攻略，缘简免费导出附件或私信发送。",
    descriptionEn:
      "Standard 1Point3Acres Life dating post format—titles, privacy wording, PDF pairing, and free YuanBio exports for attachments or DMs.",
    keywords: ["一亩三分地相亲", "1point3acres dating", "北美相亲帖"],
    contentZh: `一亩三分地（1Point3Acres）Life 版是北美华人最活跃的综合性论坛之一，其中的相亲交友子版聚集了大量留学生、持签职场人、绿卡持有者与技术移民。论坛帖适合「概括吸引点击」，详细条件则用缘简制作的 PDF 在私信或跟帖提供。掌握论坛格式，能让你在众多帖子中脱颖而出，同时避免隐私过度暴露。

**为什么一亩三分地需要「帖 + PDF」双轨？**

论坛公开帖可被搜索、截图、长期存档——写太细容易泄露公司、住址、收入。但写太简略又无法让有心人判断匹配度。最佳实践：帖文覆盖 80% 筛选字段，PDF 提供完整自我介绍与家庭背景，通过私信发放。

**标准帖子结构**

**标题**（抓眼 + 关键硬条件）：

> 【湾区相亲】90 年男，178，CS 硕士，绿卡，诚寻结婚对象

> 【多伦多】95 年女，护士 PR，性格开朗，寻长期发展对象

**正文模板**

1. **自身条件**：年龄、身高、学历、行业、地点、签证/身份
2. **家庭与 lifestyle**：简写，2–4 句
3. **择偶标准**：分点列出 4–6 条
4. **联系方式**：站内私信优先；可写「详细简历可私信索取」
5. **补充**：是否接受异地、多久见面、结婚时间预期

**正文范例（精简版）**

> 基本情况：男，1990 年生，身高 178cm，体重 70kg，硅谷软件工程师，美国硕士，绿卡。现居南湾，籍贯华东。未婚，无子女。父母在职，身体健康。
>
> 性格爱好：理性务实，爱好 hiking、摄影、做饭。不烟，偶饮酒。重视沟通，希望 1–2 年内结婚。
>
> 择偶希望：1992–1998 年生，身高 160cm+，本科及以上，有稳定职业。性格开朗善良，愿意在湾区发展。不接受长期无结婚诚意的交往。
>
> 详细中英双语简历可私信索取 PDF。请先简单自我介绍，谢谢。

**隐私写法**

- 公司：写「FAANG」「中型 biotech」「四大」而非具体组名
- 收入：「package 在湾区中位数以上」或留空到私信
- 住址：写到城市/区域，如「南湾」「Jersey City」
- 照片：论坛帖一般不直贴，PDF 或私信发送

**与缘简 PDF 配合流程**

1. 使用缘简在线制作，选 **现代**、**职场** 或 **简约** 模板（北美年轻用户常见审美）
2. 填完导出免费 PDF，自检手机阅读效果
3. 发帖后，对认真私信者发送 PDF；可附一句「请勿外传」
4. 若更新职业或签证状态，编辑缘简后重新导出，旧帖跟帖「已更新」

**论坛礼仪**

- 不发重复帖刷屏； bump 有节制
- 礼貌拒绝时勿人身攻击——社区有记忆
- 对女性帖尤其避免油腻私信；对男性帖亦勿只问收入身高
- 见面选择公共场所，告知朋友行程

**常见标题误区**

- 过于模糊：「找对象」——无信息量
- 过于功利：「年薪 50w 征婚」——引发反感
- 攻击性：「喷子勿扰」——可写「诚心私信，闲聊勿扰」

**英文元素**

一亩三分地用户中英文混用，简历 PDF 可用缘简中英对照字段；帖文中文为主即可，关键术语可括注英文（GC、OPT、NG）。

**跟帖维护**

职业跳槽、升职、 relocate 后及时更新；相亲帖有效期建议 3–6 个月，过期帖跟帖说明「已脱单」或「暂停」减少无效私信。

一亩三分地是北美华人的公共客厅。帖文负责敲门，PDF 负责深聊。缘简免费导出 PDF，让你把论坛礼仪与专业形象一次做到位。`,
    contentEn: `1Point3Acres Life is a flagship North American Chinese forum; its dating board draws students, visa holders, green-card professionals, and tech immigrants. Posts should hook clicks; full detail lives in a YuanBio PDF shared by DM. Master the format to stand out without over-exposing privacy.

**Why "post + PDF"?**

Public threads are searchable, screenshot-friendly, and archived—too much detail leaks employer and income. Too little fails screening. Best practice: ~80% of hard filters in the post; full About me and family in PDF via private message.

**Standard structure**

**Title** (hook + hard filters):

> [Bay Area] M, 1990, 178, CS MS, GC, marriage-minded

> [Toronto] F, 1995, nurse PR, cheerful, long-term relationship

**Body template**

1. **Self**: age, height, degree, industry, location, status
2. **Family/lifestyle**: 2–4 sentences
3. **Partner criteria**: 4–6 bullets
4. **Contact**: forum DM; "full biodata PDF on request"
5. **Logistics**: distance OK?, meet cadence, marriage timeline

**Sample body**

> Basics: M, 1990, 178 cm, 70 kg, South Bay software engineer, U.S. MS, GC. From East China. Never married. Parents working and healthy.
>
> Personality: practical; hiking, photography, cooking. Non-smoker. Marriage in 1–2 years.
>
> Seeking: F, 1992–1998, 160 cm+, bachelor's+, stable career, kind, Bay Area plans. No casual-only dating.
>
> Bilingual PDF available by DM—please intro yourself briefly first. Thanks.

**Privacy wording**

Employer: "FAANG," "mid-size biotech," not team name. Pay: "around Bay median" or DM only. Location: city/region only. Photos: PDF/DM, not public thread.

**YuanBio workflow**

1. Build with **Modern**, **Corporate**, or **Minimal**
2. Free PDF export; mobile check
3. DM PDF to serious replies; ask not to re-share
4. Re-export after job or visa updates; reply "updated" on thread

**Forum etiquette**

No duplicate spam; polite declines; respectful DMs; public first meetings; tell a friend your plans.

**Title mistakes**

Too vague ("looking"), too transactional ("500k salary"), hostile tone—use "serious DMs only."

**English mix**

Bilingual PDF via YuanBio; Chinese post with parenthetical GC, OPT, NG is fine.

**Maintenance**

Refresh every 3–6 months; close with "off market" or "paused."

On 1Point3Acres, the post knocks; the PDF converses. YuanBio free PDF export keeps your North American forum presence professional.`,
  },
  {
    slug: "xiaohongshu-dating-profile-tips",
    titleZh: "小红书相亲帖与简历制作",
    titleEn: "Xiaohongshu Dating Posts and Biodata Tips",
    descriptionZh:
      "在小红书发布海外华人相亲内容的选题、封面、标签策略与隐私边界，如何用缘简卡片模板与 PDF 简历承接私信咨询，全程免费制作导出。",
    descriptionEn:
      "Xiaohongshu matchmaking for overseas Chinese—topics, covers, tags, privacy boundaries, and funneling DMs with YuanBio card templates and free PDF biodata.",
    keywords: ["小红书相亲", "xiaohongshu dating", "脱单简历"],
    contentZh: `小红书上的相亲内容近年爆发：#海外相亲 #北美脱单 #相亲简历 等标签下，既有真诚分享的脱单日记，也有机构引流。对普通海外华人而言，小红书适合讲「故事与人设」，而结构化条件与家庭背景，则适合用缘简 PDF 在私信承接。两者配合，既有点击率，又有转化率，还不必在公开笔记里暴露过多隐私。

**小红书 vs 传统相亲简历的分工**

- **笔记**：生活方式、价值观、城市风景、美食、健身、读书——展示「一起过日子」的想象
- **PDF 简历**：年龄、学历、职业、家庭、择偶硬条件——给认真候选人效率筛选
- **卡片图**：缘简 9 种卡片模板导出 PNG，做封面或轮播首图，专业又不像征婚广告

**选题方向（易获流量且真诚）**

1. 「我在硅谷如何认真脱单」——过程分享，非卖惨
2. 「父母催婚但我想自己找对象」——共鸣 + 边界
3. 「相亲简历长什么样」——可打码展示缘简 **杂志** 或 **暖色** 模板截图
4. 「海外华人择偶最看重的 5 件事」——干货向
5. 「私信问我条件的，统一回复流程」——建立专业感

**笔记结构建议**

- **标题**：具体城市 + 真诚词，避免标题党谎言
- **首图**：清晰半身或生活照，卡片模板叠加关键信息（出生年、城市、职业关键词）
- **正文**：800–1200 字故事 + 3–5 个要点列表
- **结尾**：「详细资料私信「简历」领取」或「评论已关，私信带自我介绍」
- **标签**：#海外相亲 #北美生活 #脱单 #相亲简历 #华人婚恋

**隐私红线（公开笔记绝不写）**

- 全名、公司全名、工牌、办公室定位
- 精确收入、净资产、房产地址
- 父母姓名与单位
- 微信号、电话——一律私信交换，且建议先视频或语音确认身份

**私信筛选话术**

> 感谢关注！若认真相亲，请私信：1）简单自我介绍 2）现居城市 3）是否接受异地。合适则发 PDF 简历，请勿外传哦。

对敷衍「在吗」「看看」可不回或模板回复，节省精力。

**缘简制作流程**

1. 完整信息在缘简填写，选 **简约**、**现代** 或 **暖色** 简历模板
2. 导出 PDF 备用私信；用 **卡片模板** 导出 PNG 做笔记配图
3. 截图分享时注意打码联系方式与照片（若仅想展示版式）
4. 缘简完全免费，无需注册，数据在浏览器——适合反复改稿

**封面设计技巧**

- 轮播图 1：生活方式照 + 卡片模板文字
- 轮播图 2：择偶观关键词（沟通、家庭、运动）
- 轮播图 3：缘简 PDF 打码预览（展示专业度）
- 避免纯文字大字报——小红书重视觉

**评论区管理**

真诚提问可回复；恶意调侃可删评或关评；避免在评论区辩论前任或收入；统一引导私信，减少公开比较。

**与其他平台同步**

小红书笔记可摘要转发朋友圈或微信群一句话 + PDF，但注意平台调性：小红书偏叙事，微信群偏效率，勿原样复制鸡汤长文。

**常见翻车**

- 过度美颜照与简历不符——见面信任崩塌
- 公开写「只要 185+ 富二代」——舆论反噬
- 不发 PDF、只在私信口述——显得不正式
- 长期不更新笔记仍收私信——注明「2025 暂停」

小红书是海外华人年轻人的橱窗，PDF 是后台的合同草案。用缘简把橱窗做得好看、把合同做得清楚，脱单效率会高很多。`,
    contentEn: `Xiaohongshu matchmaking content has exploded—tags like #海外相亲 #北美脱单 mix sincere diaries with agency funnels. For everyday overseas Chinese, notes sell story and vibe; structured biodata belongs in YuanBio PDFs over DM. Combine both for clicks and conversions without oversharing publicly.

**Division of labor**

- **Note**: lifestyle, values, city scenes—imagine daily life together
- **PDF biodata**: age, degree, job, family, hard partner criteria—efficient screening
- **Card PNG**: YuanBio's 9 card templates for covers or carousels—polished, not cheesy

**Topic ideas**

1. "How I'm seriously dating in Silicon Valley"—process, not pity
2. "Parents push, I want my own search"—boundaries
3. "What a marriage biodata looks like"—blurred YuanBio **Magazine** or **Warm** screenshots
4. "Five things overseas Chinese care about in partners"—tips
5. "My DM script for people who ask criteria"—professional tone

**Note structure**

- **Title**: specific city + sincere hook—no clickbait lies
- **Hero image**: clear portrait or life shot plus card overlay (year, city, field)
- **Body**: 800–1200 character story + bullet takeaways
- **Close**: "DM 'resume' for PDF" or "comment closed—intro yourself in DM"
- **Tags**: #海外相亲 #北美生活 #脱单 #相亲简历

**Public red lines**

No full name, employer HQ, badge photos, exact pay, net worth, property address, parents' names, or WeChat/phone in the note—exchange after vetting DMs, ideally voice/video verify.

**DM filter script**

> Thanks for reaching out! If serious: DM brief intro, city, and distance openness. I'll share PDF biodata—please don't forward.

**YuanBio workflow**

1. Full form in **Minimal**, **Modern**, or **Warm** resume template
2. PDF for DMs; card PNG for note art
3. Blur contacts in layout screenshots
4. Free, no signup, browser storage for iterations

**Carousel tips**

Slide 1: lifestyle + card text

Slide 2: values keywords

Slide 3: blurred PDF preview

Avoid text-only posters—Xiaohongshu is visual-first.

**Comment hygiene**

Answer sincere questions; delete trolls or close comments; no income fights in thread; route to DM.

**Cross-posting**

Summarize for WeChat; do not paste the same essay—each channel has its tone.

**Fails**

Filter mismatch photos; public "only 185+ rich" lists; oral-only DMs without PDF; stale posts without "paused" notice.

Xiaohongshu is the shop window; PDF is the back-office contract. YuanBio makes both look sharp.`,
  },
  {
    slug: "bilingual-marriage-resume-chinese-english",
    titleZh: "中英双语婚恋简历制作",
    titleEn: "Bilingual Chinese-English Marriage Resume",
    descriptionZh:
      "跨国相亲场景下中英双语婚恋简历的字段对照、排版策略、自我介绍双语录写与常见翻译误区，缘简中英界面免费切换并导出 PDF/PNG。",
    descriptionEn:
      "Bilingual marriage biodata for cross-border matchmaking—field mapping, layout strategy, dual-language About me, translation pitfalls, free YuanBio CN/EN UI with PDF/PNG export.",
    keywords: ["双语相亲简历", "bilingual biodata", "chinese english marriage profile"],
    contentZh: `跨国相亲场景中，语言障碍会在第一次见面之前就造成误判：对方父母读不懂全英文简历，你的英文同事却看不懂纯中文 biodata；海归与本土华人混介绍时，字段含义（「稳定工作」「籍贯」「单位」）也可能错位。一份中英双语或「中文主体 + 英文标签/摘要」的婚恋简历，能显著降低摩擦，展示你的文化桥梁能力——这本身就是海外华人的加分项。

**三种常见双语模式**

1. **标签对照型**：正文中文，表头双语（姓名 Name、身高 Height）——最适合父母转发与国内长辈
2. **平行摘要型**：中文完整自我介绍 + 段末 3–5 句英文 summary——适合 ABC 与海归
3. **全双语型**：每个字段中英各写一行——信息量大，适合 **杂志**、**时间线** 模板，版面需简洁避免拥挤

缘简支持中英文界面切换，同一数据可切换语言预览不同模板，导出 PDF 前选定最终排版。

**字段翻译对照表（建议统一）**

- 姓名 / Name
- 出生年份 / Year of birth
- 身高 / Height (cm)
- 学历 / Education
- 职业 / Occupation
- 现居地 / Current location
- 籍贯 / Ancestral hometown
- 婚姻状况 / Marital status
- 自我介绍 / About me
- 择偶期望 / Partner preferences

数字格式统一：身高用 cm（附 inches 可选），年份用四位数，避免「92 年」在英文侧写成 confusing 格式。

**自我介绍双语录写**

中文段保持 200–350 字，语气真诚；英文 summary 不是机器翻译堆砌，而是给非中文读者的「电梯陈述」：

> 中文：我在伦敦从事金融分析，生活规律，喜欢戏剧与徒步，重视诚实与沟通，希望 2 年内结婚，愿意与伴侣协商两地家庭安排。

> English: London-based financial analyst, structured lifestyle, into theatre and hiking. Value honesty and clear communication. Marriage-minded within ~2 years; open to planning across UK and China family commitments.

避免英文段过长重复中文；避免中文段夹杂大量英文缩写无人解释。

**家庭背景翻译分寸**

「父亲公务员退休」可译 Civil servant (retired)；不必强行找英文职级对标引发误解。「母亲经商」可译 runs a small business。兄弟姐妹 section 用简短英文括号即可。涉及政治敏感或过度细节的单位名可泛化。

**模板选择**

- 长辈阅读为主：**典雅**、**红韵** + 标签对照
- 同龄海归：**现代**、**职场** + 平行摘要
- 信息丰富：**杂志**、**时间线**——注意双语行距

缘简 9 种简历模板与 9 种卡片模板均可配合双语内容；卡片模板适合 LinkedIn/Instagram 英文圈引流，PDF 负责中文家庭网。

**常见翻译误区**

- 把「缘分」译成 fate——可用 connection or serious relationship
- 「门当户对」直译——用 shared values and compatible backgrounds
- 「孝顺」译成 obedient——用 respects parents and family traditions
- 收入「年薪 xx 万」——注明 RMB or USD，或写 range

**质检清单**

- 中英文姓名拼写一致（Zhang vs Chang）
- 城市名统一（Beijing vs Peking 建议前者）
- 婚姻状态术语一致（never married / 未婚）
- 择偶年龄区间两端年份正确
- 英文无拼写错误——可用 Grammarly 过一遍 summary

**使用缘简的工作流**

1. 中文界面起草核心内容
2. 切换英文界面核对字段标签与导出效果
3. 选定模板免费导出 PDF；需要英文配图时用卡片模板导出 PNG
4. 全程免费，无需注册，数据存浏览器，方便跨国时区协作修改

双语简历不是炫语言，而是尊重读者。缘简让技术细节变简单，你把精力放在真诚表达与准确事实上。`,
    contentEn: `Cross-border matchmaking hits language walls before the first coffee: parents cannot read all-English files; local colleagues cannot parse Chinese-only biodata; returnees and local Chinese use different field assumptions. Bilingual or Chinese-primary layouts with English labels/summaries reduce friction and signal bridge-building—a real overseas Chinese asset.

**Three bilingual modes**

1. **Label dual**: Chinese body, bilingual headers—best for parents and elders in China
2. **Parallel summary**: full Chinese About me + 3–5 sentence English close—ABC and returnees
3. **Full dual-line fields**: each row CN+EN—dense; use **Magazine** or **Timeline** templates carefully

YuanBio switches Chinese/English UI; preview templates before free PDF export.

**Field map**

姓名/Name, 出生年份/Year of birth, 身高/Height (cm), 学历/Education, 职业/Occupation, 现居地/Current location, 籍贯/Hometown, 婚姻状况/Marital status, 自我介绍/About me, 择偶期望/Partner preferences.

Unify numbers: cm height, four-digit years.

**Dual About me**

Chinese 200–350 characters, sincere; English summary is an elevator pitch—not word-for-word Google translate:

> CN: London financial analyst, structured life, theatre and hiking, values honesty, marriage in ~2 years, open to UK-China family planning.

> EN: Same content, tight and natural.

**Family translation tact**

父亲公务员退休 → father, retired civil servant. Avoid over-specific employer names. Keep siblings brief.

**Templates**

Elders: **Elegant**, **Traditional (红韵)** + label dual

Peers: **Modern**, **Corporate** + summary block

Rich profiles: **Magazine**, **Timeline**

Card PNG for English social; PDF for Chinese family nets.

**Pitfalls**

缘分 → connection, not fate

门当户对 → compatible backgrounds and values

孝顺 → respects parents, not obedient

Salary: mark RMB or USD or ranges

**QA checklist**

Matching name spelling, city names (Beijing), marital terms, age band math, English spellcheck on summary.

**YuanBio flow**

Draft in Chinese UI → switch English for labels → free PDF/PNG export, no signup, browser storage for async edits across time zones.

Bilingual biodata respects readers. YuanBio handles layout; you handle truth and tone.`,
  },
  {
    slug: "canada-chinese-matchmaking-biodata",
    titleZh: "加拿大华人相亲简历指南",
    titleEn: "Canada Chinese Matchmaking Biodata Guide",
    descriptionZh:
      "多伦多、温哥华、蒙特利尔等加拿大华人社区相亲简历要点：PR/公民、法语能力、地域偏好与本地渠道，缘简 9 种模板免费导出 PDF 私信介绍。",
    descriptionEn:
      "Biodata guide for Chinese communities in Toronto, Vancouver, Montreal—PR/citizenship, French skills, regional preferences, local channels, and free YuanBio PDF exports.",
    keywords: ["加拿大华人相亲", "温哥华相亲", "多伦多婚恋"],
    contentZh: `加拿大华人人口仅次于美国，多伦多、温哥华、蒙特利尔、卡尔加里、渥太华都有活跃相亲圈。与美国相比，加拿大简历里常多问几句：是否公民或 PR、英语与法语能力、冬天能否适应、是否愿意回国发展、对多元文化家庭的看法。一份针对加拿大语境优化的婚恋简历，能让你在同城介绍、华人论坛、教会团契、校友群里更高效地被「对的人」看见。

**加拿大华人相亲常关注的字段**

- **身份**：公民、PR、工签、学签——工签需写稳定程度与移民路径预期
- **语言**：英语必备；蒙特利尔或联邦政府圈常看重法语；可写 CLB 等级或「日常流利」
- **地域**：多伦多 GTA vs 温哥华 Lower Mainland vs 蒙特利尔——跨城异地恋成本高，建议写清
- **气候与生活**：是否滑雪、是否开车、对长冬天的态度——生活方式匹配在加拿大尤为重要
- **回国意愿**：每年回国频率、父母是否在加、是否接父母来加——务实写明减少婚后争执

**城市圈写作提示**

**多伦多/密西沙加/万锦**：华人密度高，竞争激烈，简历宜突出职业稳定与性格；模板推荐 **职场**、**现代**

**温哥华/列治文/本拿比**：生活节奏相对慢，户外爱好可写细；**暖色**、**简约** 受欢迎

**蒙特利尔**：英法双语加分；注明法语水平与魁省长期计划

**卡尔加里/埃德蒙顿**：能源、医疗、教育行业多；写明是否接受草原省份长期定居

**常见渠道**

- 本地华人论坛、Facebook 群组、微信群
- 教会、同乡会、滑雪/徒步俱乐部间接介绍
- 婚恋网站私信时附 PDF 比纯文字更正式
- 父母在国内通过亲戚介绍加拿大候选人——需 PDF 方便微信转发

**范例：自我介绍片段（多伦多）**

> 现居万锦，从事会计相关 work，CPA 路径中，PR 身份。英语工作环境流利，粤语母语，普通话标准。周末羽毛球、夏日露营。父母部分时间在加，重视家庭团聚。寻找善良踏实、愿在 GTA 长期发展的对象，1–2 年有结婚计划，接受双方父母适度参与。

**隐私与合规**

加拿大重视 privacy；简历不写 SIN、具体门牌、雇主内部编号。收入可写「符合 GTA 同行业中等水平」。照片使用本人授权肖像。

**双语与模板**

加拿大华人中英混用普遍；缘简中英界面 + **典雅** 给长辈、**杂志** 给信息量大者。9 种简历 + 9 种卡片模板，免费导出 PDF/PNG，使用缘简在线制作，无需注册。

**见面与礼仪**

初面宜选公共场所；冬季约会计划体现体贴；尊重对方宗教或饮食禁忌（清真、素食）；不合适时礼貌说明，华人圈小，口碑重要。

**检查清单**

- PR/公民/工签状态最新
- 城市名用加拿大习惯（Vancouver, ON/Markham）
- 法语能力如实
- 择偶地域与自身一致
- PDF 手机可读，文件名专业

加拿大华人社区重视礼貌、稳定与真实。缘简帮你把资料做成体面 PDF，把精力留给滑雪道上的第一次握手或咖啡馆里的长谈。`,
    contentEn: `Canada's Chinese diaspora is second only to the U.S.—Toronto, Vancouver, Montreal, Calgary, and Ottawa all have active matchmaking circles. Canadian biodata often adds: citizenship or PR, English/French ability, winter lifestyle, China ties, and multicultural family views. A Canada-tuned profile helps you surface in city intros, forums, church fellowships, and alumni groups.

**Fields Canadians often care about**

- **Status**: citizen, PR, work/study permit—note stability and immigration path
- **Languages**: English baseline; French for Montreal or federal circles; CLB or "fluent daily"
- **Region**: GTA vs Lower Mainland vs Montreal—distance is costly; be explicit
- **Lifestyle**: driving, skiing, long winters—fit matters in Canada
- **China ties**: visit frequency, parents' location, sponsoring parents later

**City notes**

**Toronto/Markham/Mississauga**: dense competition—highlight stable career and personality; **Corporate**, **Modern**

**Vancouver/Richmond/Burnaby**: slower pace—detail outdoor hobbies; **Warm**, **Minimal**

**Montreal**: French bonus; long-term Quebec plans

**Calgary/Edmonton**: energy, health, education—confirm prairie settlement OK

**Channels**

Local forums, Facebook groups, WeChat, church/township clubs, dating site DMs with PDF, parents in China forwarding via WeChat.

**Sample About me (Toronto)**

> Based in Markham, accounting track toward CPA, PR. Fluent English at work; Cantonese native; Mandarin standard. Badminton weekends, summer camping. Parents partly in Canada; value family reunification. Seeking kind, steady partner for long-term GTA life, marriage in 1–2 years, respectful parent involvement.

**Privacy**

No SIN, street numbers, internal employer IDs. Income as "GTA industry median range." Licensed photos only.

**Bilingual templates**

YuanBio CN/EN UI; **Elegant** for elders, **Magazine** for dense profiles; 9 resume + 9 card templates; free PDF/PNG; no signup.

**Etiquette**

Public first meetings; winter-aware planning; dietary respect; polite declines—small community reputations linger.

**Checklist**

Current status, Canadian city spelling, honest French level, aligned location expectations, mobile PDF, professional filename.

Canadian Chinese networks reward politeness, stability, and authenticity. YuanBio ships the dignified PDF so you can focus on the first handshake on the slopes or a long café talk.`,
  },
  {
    slug: "australia-chinese-marriage-profile",
    titleZh: "澳洲华人婚恋简历模板",
    titleEn: "Australia Chinese Marriage Profile Template",
    descriptionZh:
      "悉尼、墨尔本、布里斯班华人相亲资料写作指南：工签/PR、户外生活方式、移民故事与模板推荐，缘简免费在线制作并导出 PDF 与 PNG。",
    descriptionEn:
      "Marriage biodata for Sydney, Melbourne, Brisbane Chinese communities—visa/PR, outdoor lifestyle, immigration narrative, template picks, free YuanBio PDF/PNG export.",
    keywords: ["澳洲华人相亲", "悉尼婚恋", "墨尔本相亲简历"],
    contentZh: `澳洲华人社区以悉尼、墨尔本为双核心，布里斯班、珀斯、阿德莱德也有稳步增长的相亲需求。澳洲相亲简历除了常规学历职业，还特别看重：户外与运动生活方式、移民路径与留澳决心、是否要孩子、对「两国生活」的态度——毕竟飞回中国比从洛杉矶更久更贵。一份贴合澳洲语境的婚恋简历，应让人读完能想象与你一起周末去海滩、BBQ、看澳网，而不是只看见一份冷冰冰的职务说明。

**澳洲华人简历高频话题**

- **签证**：公民、PR、482、189、学生转 PR 路径——写清稳定度与大致时间线
- **城市**：悉尼 inner west vs 北区、墨尔本东南区 vs city——同城优先是默认假设
- **生活方式**：海滩、徒步、bushwalking、健身、咖啡文化——具体爱好比「爱运动」更有说服力
- **移民故事**：来澳年份、为何留下、是否接父母来澳——简短即可，不必写成散文
- **子女计划**：想要几个、何时要——澳洲华人相亲里常较早坦诚讨论

**城市写作差异**

**悉尼**：生活成本高，职业与住房诚实写；模板 **现代**、**杂志** 适合快节奏都市感

**墨尔本**：文艺、咖啡、体育赛事多——自我介绍可加文化爱好；**暖色**、**典雅**

**布里斯班/黄金海岸**：气候户外主打；注明是否愿 relocate 到南部城市

**珀斯**：华人圈较小，信息完整度比花哨排版更重要；**简约**、**时间线**

**渠道与习惯**

华人论坛、小红书澳洲标签、微信群、教会、校友会；相亲有时从 BBQ 或 hiking 群间接发生。私信介绍附 PDF 显诚意。父母在国内通过澳洲亲戚牵线时，PDF 需中文清晰、身份字段明确。

**范例：择偶期望（墨尔本）**

> 希望对方 1988–1996 年生，身高 170cm 以上，有稳定职业与 PR 或公民身份。性格温和，愿意沟通，欣赏简单生活。接受在墨尔本长期定居，周末可一起运动或看展。计划婚后 1–2 年内要孩子，可协商。不接受长期无结婚诚意的交往。

**户外人设要真实**

勿写「每日冲浪」若实际只是偶尔；可写「夏天爱去 Mornington 徒步，冬 gym」。照片可选一张户外、一张正装，PDF 内排版缘简 **古风** 或 **现代** 均可。

**缘简模板推荐**

- 年轻职场：**现代**、**简约**、**职场**
- 重视家庭、语气柔和：**暖色**
- 经历丰富（多国生活）：**时间线**
- 社交配图：9 种 **卡片模板** PNG

缘简完全免费，浏览器填写，导出 PDF 与 PNG，使用缘简在线制作，无需注册，适合在澳洲时区慢慢改到满意。

**礼仪提示**

- 尊重原住民土地致谢在部分场合出现，简历不必写，但约会尊重文化差异
- 饮酒文化普遍，可写明自己是否饮酒
- 动物过敏、素食若有关择偶厨房生活，可写入期望
- 见面选公共场所，告知朋友

**检查清单**

- 签证状态最新（尤其递签后）
- 城市区名澳式拼写（Sydney, VIC, NSW）
- 中英文单位一致
- 文件小于 2MB，手机清晰

澳洲华人相亲重「能不能一起玩、能不能一起留下」。缘简帮你把简历做得清楚好看，剩下的交给第一次海边散步时的对话。`,
    contentEn: `Australia's Chinese communities center on Sydney and Melbourne, with growing demand in Brisbane, Perth, and Adelaide. Beyond degree and job, Australian biodata weighs outdoor lifestyle, visa/PR path, children plans, and two-country life—China trips are long and costly from Sydney. A good profile should evoke weekends at the beach, BBQs, or the Australian Open—not only a job title.

**Hot topics**

- **Visa**: citizen, PR, 482, 189, student pathways—stability and timeline
- **City**: Sydney regions vs Melbourne corridors—same-city default
- **Lifestyle**: beach, hiking, bush walks, gym, coffee—specifics beat "active"
- **Immigration story**: years in Australia, why staying, parents sponsorship outlook—brief
- **Children**: how many and when—often discussed earlier in Chinese-Australian intros

**City nuance**

**Sydney**: high cost—honest career/housing; **Modern**, **Magazine**

**Melbourne**: arts and sports—cultural hobbies welcome; **Warm**, **Elegant**

**Brisbane/GC**: outdoor lead; note openness to southern cities

**Perth**: smaller pool—completeness over flash; **Minimal**, **Timeline**

**Channels**

Forums, Xiaohongshu AU tags, WeChat, church, alumni; intros from BBQ/hiking circles; PDF for serious DMs; parents in China need clear Chinese status fields.

**Sample expectations (Melbourne)**

> Partner born 1988–1996, 170 cm+, stable job, PR or citizen. Gentle, communicative, simple life. Long-term Melbourne, active weekends or exhibitions. Kids in 1–2 years after marriage, negotiable. No casual-only dating.

**Authentic outdoors**

Do not claim daily surfing if occasional—"summer Mornington hikes, winter gym." One outdoor and one formal photo; **Classic (古风)** or **Modern** PDF layouts via YuanBio.

**Template picks**

Young professionals: **Modern**, **Minimal**, **Corporate**

Family tone: **Warm**

Multi-country history: **Timeline**

Social: **9 card templates** as PNG

YuanBio free, browser-based, PDF/PNG export, no signup.

**Etiquette**

Note drinking preferences; mention vegetarian or pet allergies if household-relevant; public meetings; tell a friend.

**Checklist**

Updated visa after lodgement, Australian city spelling, consistent units, <2 MB mobile PDF.

Australian Chinese matchmaking asks: can we play together and stay together? YuanBio clarifies the resume so the first coastal walk can do the rest.`,
  },
  {
    slug: "second-marriage-biodata-overseas-chinese",
    titleZh: "海外华人再婚简历怎么写",
    titleEn: "Second Marriage Biodata for Overseas Chinese",
    descriptionZh:
      "离异、丧偶海外华人再婚简历写作指南：婚姻史表述、子女抚养、择偶坦诚与模板选择，消除 stigma 的同时建立信任，缘简免费填写导出。",
    descriptionEn:
      "Remarriage biodata for divorced or widowed overseas Chinese—marital history wording, custody, honest expectations, template choices, trust without stigma, free YuanBio export.",
    keywords: ["再婚简历", "离异相亲", "second marriage biodata"],
    contentZh: `再婚在海外华人圈子里并不罕见，却仍是许多人写作婚恋简历时最犹豫的部分：写少了怕事后被说隐瞒，写多了又怕首轮就被标签化。离异、丧偶、带子女单身——每种情况都有得体、坦诚、高效的表述方式。目标不是博取同情，而是让合适的人快速理解你的过往与现在的结婚诚意，减少「排雷阶段」的无效沟通。

**再婚简历的核心原则**

1. **坦诚一句带过婚姻史**，重点放在当下生活与未来规划
2. **子女情况写清抚养与相处节奏**，不展开前任纠纷
3. **择偶期望明确接受再婚身份**，并写清对对方子女的 openness
4. **语气平稳**，不控诉前任，不过度道歉

> 范例：2018 年离异，无子女。过去经历让我更珍惜沟通与尊重，现诚心寻找以再婚为目的的伴侣。

> 范例：丧偶三年，有一女 8 岁，主要抚养在我这边，周末可与对方家庭互动。希望寻找善良有耐心、能接受父亲角色的伴侣。

**各字段怎么写**

**婚姻状况**：直接选「离异」「丧偶」，勿写「未婚」或「单身」模糊带过（海外语境 single 可指未婚，中文简历宜明确）

**子女**：人数、年龄、抚养权、是否同住、是否期待对方有子女

**职业与经济**：稳定收入对再婚尤其重要，可写定性描述；不必证明给前任看，但要给未来伴侣安全感

**家庭背景**：父母是否帮忙带娃、是否支持再婚——一句即可

**自我介绍**：强调性格成长、生活规律、情绪稳定、社交圈；可写「喜欢简单家庭晚餐」「重视孩子心理健康」

**择偶期望**

- 明确「接受离异/丧偶对象」或「不介意对方有子女」
- 写清是否再要孩子
- 写清地域——带娃者不易长途 relocate
- 底线：不接受家暴史隐瞒、不接受与对方前任持续纠缠

**模板与受众**

- 给长辈亲戚：**红韵**、**典雅**——庄重不轻浮
- 同龄二婚：**暖色**、**现代**、**简约**——柔和真实
- 信息复杂（多段婚史、多个子女）：**时间线** 理清节点，但文字仍克制

缘简所有模板均支持自由填写婚姻与子女字段；完全免费，无需注册，浏览器保存，方便反复修改措辞直到舒服为止。

**隐私与法律**

不写前任姓名、不打官司细节、不贴法院文件；子女全名可缩写；遵守当地抚养协议关于旅行与介绍的限制。

**常见误区**

- 完全隐瞒婚史——见面或背景调查时信任崩塌
- 长篇控诉前任——读者担心你未走出阴影
- 只写「我很好」却无带娃现实安排——对方无法评估
- 择偶写「不限」却对对方子女暗中排斥——应早期写明

**话术：如何与家长沟通再婚简历**

> 我会如实写离异，但强调现在状态和诚意，对方家庭也更能接受。请帮我看措辞是否得体。

**话术：给对方介绍人**

> 我离异无孩 / 带娃，资料里已写清，若您那边接受这类情况，我再发 PDF 详细简历。

**检查清单**

- 婚姻史与子女字段无矛盾
- 择偶与自身带娃能力匹配（时间、经济、情绪）
- 照片自然，非新婚写真风格误导
- PDF 更新日期近，避免「三年前离异」未更新

再婚不是打折的人生阶段，而是另一种成熟选择。缘简帮你把敏感信息排版得体面、清楚，让对的人省下猜测时间，把对话留给未来。`,
    contentEn: `Remarriage is common in overseas Chinese circles yet still the hardest section to write: too little feels like hiding; too much triggers labels. Divorced, widowed, or single with kids—each has tactful, efficient wording. Goal is not pity—it is helping the right person understand your past and present marriage intent fast.

**Core principles**

1. **One honest line on marital history**; focus on today and future
2. **Clear custody and parenting rhythm**; no ex drama
3. **Expectations explicitly welcome remarriage** and stepfamily realities
4. **Steady tone**—no ex bashing, no over-apology

> Sample: Divorced 2018, no children. Experience taught me to value communication; seeking marriage-minded partner.

> Sample: Widowed three years; daughter 8, primary custody with me; weekends flexible for blended time. Seeking patient partner open to a father role.

**Fields**

**Marital status**: state divorced or widowed clearly—not vague single where CN readers expect precision

**Children**: count, ages, custody, cohabitation, openness to partner's kids

**Career**: stability matters; qualitative income OK

**Family**: parental childcare help or remarriage support—one line

**About me**: growth, routines, emotional stability, kid-friendly values

**Expectations**

Welcome divorced/widowed partners; note openness to stepchildren; whether more kids desired; geography—relocating with kids is hard; deal-breakers on violence history or entangled exes

**Templates**

Elders: **Traditional (红韵)**, **Elegant (典雅)**

Peers: **Warm (暖色)**, **Modern (现代)**, **Minimal (简约)**

Complex histories: **Timeline (时间线)** with concise text

YuanBio marriage/children fields work on all nine resume templates; free, no signup, browser edits until wording feels right.

**Privacy/legal**

No ex names, court stories, or custody document scans; child name initials if needed; respect custody travel limits.

**Mistakes**

Hiding history; ex essay; ignoring childcare logistics; public "no limits" but private rejection of stepkids—state early.

**Scripts**

To parents: honest status plus present focus—ask them to review tone.

To matchmaker: status summarized; send PDF if they accept remarriage cases.

**Checklist**

Consistent history/children fields; expectations match parenting capacity; natural photos; recent PDF dates.

Remarriage is not a discount life chapter—it is a mature path. YuanBio formats sensitive facts with dignity so the right match skips guessing games.`,
  },
];

export function getSeoPage(slug: string): SeoPage | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}

export function getAllSeoSlugs(): string[] {
  return SEO_PAGES.map((p) => p.slug);
}
