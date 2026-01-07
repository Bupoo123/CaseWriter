const { createApp } = Vue;

const createCareSections = () => [
    {
        title: '1. 标题', enTitle: 'Title',
        description: '标题应明确病例类型并突出核心现象，便于索引与检索。标题中必须出现 "case report" 或 "case study"，并写出最关注的症状、诊断、检查或干预。',
        content: '',
        placeholder: '示例：Case report: Metagenomic sequencing resolves recurrent fever caused by ...',
        tips: [
            '优先写明病例类型（case report/case study）与患者特征或疾病场景。',
            '突出最具教学价值的症状、诊断或干预亮点。',
            '控制在 15-20 词之间，避免含糊缩写或空泛形容词。'
        ],
        guidelineFocus: [
            '标题中明确病例类型，突出核心现象以便检索。',
            '凸显症状、诊断、检查或干预中的关键创新或差异点。',
            '如患者属于特殊人群（儿童、孕妇、免疫抑制者等），可适度点出。'
        ],
        checklist: [
            '标题包含 "case report"/"case study" 字样。',
            '突出至少一个核心现象（症状、诊断、检查或干预）。',
            '语言精炼并可被数据库准确检索。'
        ],
        checkKey: 'title',
        wordLimit: { max: 16, type: 'words' }
    },
    {
        title: '2. 关键词', enTitle: 'Keywords',
        description: '选择 2-5 个关键词（含 "case report/case study"）支持索引与检索。',
        content: '',
        placeholder: '例如：case report; metagenomic sequencing; rare infection; pediatrics',
        tips: [
            '使用标准化 MeSH 术语提升可检索性。',
            '关键词之间使用分号、逗号或换行分隔。',
            '关键词数量建议 2-5 个，覆盖疾病、病原、技术、人群等要素。'
        ],
        guidelineFocus: [
            '至少包含 2 个关键词，并包含 "case report/病例报告"。',
            '优先选用权威词表（如 MeSH）的术语。',
            '突出疾病、病原、关键技术或患者人群等检索点。'
        ],
        checklist: [
            '包含 "case report/病例报告" 作为关键词之一。',
            '选择 2-5 个核心关键词并合理分隔。',
            '覆盖疾病、病原、干预或人群等关键维度。'
        ],
        checkKey: 'keywords'
    },
    {
        title: '3. 摘要', enTitle: 'Abstract',
        description: '编写 100-250 词的结构式摘要，突出主要收获。建议按照 CARE 推荐的 5 个模块（Introduction、Case Presentation、Management and Outcomes、Conclusion、Learning Points）撰写。',
        content: '',
        placeholder: 'Introduction（背景）：\nCase Presentation（病例介绍）：\nManagement and Outcomes（诊疗与结局）：\nConclusion（结论）：\nLearning Points（教学要点）：',
        tips: [
            'Introduction：说明该病例对现有知识的补充。',
            'Case Presentation：突出主要症状、诊断依据和干预措施。',
            'Conclusion/Learning Points：用 1-2 句话总结 take-away lesson。'
        ],
        guidelineFocus: [
            '摘要保持 100-250 词，采用结构式小节。',
            'Introduction 说明新增价值，Case Presentation 概述患者与诊疗，Management and Outcomes 写干预与结局，Conclusion 与 Learning Points 强调要点。',
            '无需引用文献，避免冗长背景。'
        ],
        checklist: [
            'Introduction：说明诊断挑战或知识空白。',
            'Case Presentation：概述人口学信息、主要症状与关键诊疗。',
            'Management/Conclusion/Learning Points：突出干预、结局与要点。'
        ],
        checkKey: 'abstract',
        wordLimit: { min: 100, max: 250, type: 'words' }
    },
    {
        title: '4. 引言', enTitle: 'Introduction',
        description: '简要介绍病例背景，体现病例的独特性和重要性，并在段末声明遵循 CARE 指南。',
        content: '',
        placeholder: '背景：\n- 疾病/病原的现状与挑战\n- 关键文献与知识缺口\n- 本报告的价值与 CARE 指南声明\n',
        tips: [
            '引用关键文献说明疾病现状、知识缺口与研究空白。',
            '突出病例与既往报道的差异、新发现或临床意义。',
            '在段末说明“本病例报告遵循 CARE 指南”。'
        ],
        guidelineFocus: [
            '聚焦与病例直接相关的临床背景，不写全面综述。',
            '阐明病例的重要性、知识缺口与核心信息。',
            '明确声明遵循 CARE 指南。'
        ],
        checklist: [
            '介绍疾病/病原的诊疗现状与挑战。',
            '引用 2-3 篇关键文献支撑背景。',
            '声明 "本病例报告遵循 CARE 指南"。'
        ],
        checkKey: 'introduction',
        wordLimit: { min: 120, type: 'words' }
    },
    {
        title: '5. 患者信息', enTitle: 'Patient information',
        description: '病例描述模块的第一部分，需交代患者人口学特征、主诉、病史与相关背景信息。',
        content: '',
        placeholder: '人口学信息（年龄/性别/种族等）：\n主诉（患者原话）：\n现病史与症状时间线：\n既往史/共病/过敏史：\n家族史与社会史：\n心理及生活方式因素：',
        tips: [
            '用匿名化表达患者身份，遵循 HIPAA 去标识化要求。',
            '按时间顺序呈现症状演变与既往干预。',
            '必要时记录患者的心理社会因素与健康行为。'
        ],
        guidelineFocus: [
            '提供年龄、性别/性别认同、族群等人口学信息。',
            '主诉可引用患者原话并呈现症状时间线。',
            '记录既往病史、合并症、家族史及社会心理因素。'
        ],
        checklist: [
            '人口学信息齐全且已去标识化。',
            '详细记录主诉与现病史的时间顺序。',
            '交代既往史、共病、过敏、生活方式或心理因素。'
        ],
        checkKey: 'patient-info'
    },
    {
        title: '6. 临床发现', enTitle: 'Clinical findings',
        description: '病例描述模块的第二部分，按系统总结体格检查、生命体征与关键临床发现。',
        content: '',
        placeholder: '首诊体格检查：\n生命体征：\n重要阳性/阴性发现：\n影像或其他临床观察：',
        tips: [
            '按系统（神经、呼吸、心血管等）或时间呈现。',
            '说明评估方法，如量表、影像或床旁检查。',
            '必要时以表格归纳大量体征数据。'
        ],
        guidelineFocus: [
            '报告初诊和随访中的关键体征与临床观察。',
            '同时记录重要的阴性发现以展示诊断思路。',
            '适当引用影像、照片或量表（去标识化）。'
        ],
        checklist: [
            '记录首诊生命体征与异常体征。',
            '说明评估方法或量表来源。',
            '列出重要阴性发现或排除结果。'
        ],
        checkKey: 'clinical-findings'
    },
    {
        title: '7. 时间线', enTitle: 'Timeline',
        description: '病例描述模块的第三部分，以表格或图示形式呈现诊疗关键事件的时间顺序。',
        content: '',
        placeholder: '| 日期 | 事件 | 备注 |\n|---|---|---|\n| 2024-01-01 | 急诊就诊，出现高热 | -- |\n| 2024-01-03 | mNGS 送检，48 小时出报告 | -- |\n| 2024-01-05 | 启动靶向抗感染治疗 | 记录剂量 |\n',
        tips: [
            '时间线应覆盖病史、检查、诊断、治疗与随访。',
            '使用右侧滚动面板查看与调整事件，必要时配合表格或图示。',
            '保持单位一致（日期/周/月），必要时注明时长。'
        ],
        guidelineFocus: [
            '呈现病例从首诊到随访的完整轨迹。',
            '包含诊断检查、干预措施与结局节点。',
            '注明重要决策点与信息来源。'
        ],
        checklist: [
            '列出病程关键时间节点与事件。',
            '记录检查、诊断、治疗和随访的顺序。',
            '确保时间线与正文描述保持一致。'
        ],
        checkKey: 'timeline'
    },
    {
        title: '8. 诊断评估', enTitle: 'Diagnostic assessment',
        description: '描述诊断策略、关键检查、鉴别诊断与证据。',
        content: '',
        placeholder: '关键检查与结果（含日期与参考范围）：\n鉴别诊断列表及排除依据：\n诊断挑战或延误因素：\n诊断结论与证据来源：',
        tips: [
            '明确列出实验室、影像、病理、分子检测等核心结果。',
            '说明诊断难点、误导因素及解决方式。',
            '引用相关指南或文献支撑诊断选择。'
        ],
        guidelineFocus: [
            '呈现诊断方法、结果数值及参考范围。',
            '解释鉴别诊断过程与最终结论的证据。',
            '描述诊断中的限制、挑战或不确定性。'
        ],
        checklist: [
            '列出关键检查及其参考值与日期。',
            '说明鉴别诊断与排除理由。',
            '讨论诊断挑战、局限及文献支持。'
        ],
        checkKey: 'diagnostic'
    },
    {
        title: '9. 治疗干预', enTitle: 'Therapeutic interventions',
        description: '按时间说明干预措施、剂量、执行过程及调整。',
        content: '',
        placeholder: '主要治疗（药物/手术/支持治疗）：\n剂量、频次、给药途径、执行者：\n遵循的指南或决策理由：\n治疗调整、不良事件与管理：',
        tips: [
            '采用 TIDieR 框架描述干预（What, Who, How, Where, When, How much）。',
            '记录治疗过程中任何调整及其原因。',
            '注明药物生产商或器械型号（如与结果相关）。'
        ],
        guidelineFocus: [
            '详细记录干预方案、剂量、频次与持续时间。',
            '说明干预的依据、执行者与场景。',
            '报告治疗依从性、不良事件及处理方式。'
        ],
        checklist: [
            '描述干预的全部组成要素与实施细节。',
            '交代治疗依据及调整原因。',
            '记录依从性、不良反应及应对措施。'
        ],
        checkKey: 'therapeutic'
    },
    {
        title: '10. 随访和结果', enTitle: 'Follow-up and outcomes',
        description: '记录随访时间点、临床与患者感知的结局及不良事件。',
        content: '',
        placeholder: '随访时间点：\n临床结局（指标/影像/实验室）：\n患者报告的结局或生活质量变化：\n依从性与其他干预：\n不良事件（若无亦需说明）：',
        tips: [
            '区分临床医生评估与患者自我感受。',
            '记录每个随访节点的客观指标与症状变化。',
            '说明未发生不良事件或依从性情况。'
        ],
        guidelineFocus: [
            '追踪治疗期间及之后的纵向结果。',
            '报告患者依从性、额外护理与不良事件。',
            '如无不良事件或复发，应明确写明。'
        ],
        checklist: [
            '列出每个随访时间点与评估结果。',
            '描述临床与患者报告结局及生活质量。',
            '记录不良事件、依从性或额外干预。'
        ],
        checkKey: 'follow-up'
    },
    {
        title: '11. 讨论', enTitle: 'Discussion',
        description: '分析病例启示、文献比较、机制推测与局限性。',
        content: '',
        placeholder: '核心发现与意义：\n与既往文献的异同：\n可能机制或解释：\n局限性（单病例、偏倚、资料缺口）：\n临床实践或研究建议：',
        tips: [
            '将病例发现置于文献背景中比较分析。',
            '讨论潜在机制、经验与局限性。',
            '聚焦 1-2 条关键教学信息，避免夸大推广。'
        ],
        guidelineFocus: [
            '强调病例的独特贡献与关键教训。',
            '与最新文献进行对比并引用来源。',
            '坦诚说明局限性和不可推广性。'
        ],
        checklist: [
            '总结病例带来的主要临床经验。',
            '引用并比较相关文献或病例系列。',
            '陈述局限性与未来研究或实践建议。'
        ],
        checkKey: 'discussion',
        wordLimit: { min: 200, type: 'words' }
    },
    {
        title: '12. 患者观点', enTitle: 'Patient perspective',
        description: '（可选）记录患者或家属对诊疗经历的真实感受。',
        content: '',
        placeholder: '患者/家属对疾病的看法：\n治疗过程中的体验与情绪：\n对医疗团队的反馈与建议：',
        tips: [
            '确保患者或代理人同意分享内容。',
            '突出对新技术或干预的真实反馈。',
            '可引用第一人称叙述增强感染力。'
        ],
        guidelineFocus: [
            '让患者声音补充临床视角，尤其在新疗法中。',
            '说明关键影响（生活质量、心理变化等）。',
            '如无法获取，应记录尝试情况。'
        ],
        checklist: [
            '确认已获得患者授权引用其观点。',
            '记录对诊疗过程或结果的主观感受。',
            '适度反映对未来护理的期待或建议。'
        ],
        checkKey: 'patient-perspective',
        optional: true
    },
    {
        title: '13. 知情同意', enTitle: 'Informed consent',
        description: '说明知情同意与伦理审批情况，确保合规。',
        content: '',
        placeholder: '已获得患者/监护人的书面知情同意。涉及影像或可识别信息的部分均获额外授权。如患者无决策能力，记录代理同意及沟通过程。',
        tips: [
            '说明知情同意形式（书面/口头）及日期。',
            '涉及照片或罕见疾病时，说明额外授权。',
            '若无法获取同意，应说明尝试过程和伦理意见。'
        ],
        guidelineFocus: [
            '明确写出已获得签署的知情同意。',
            '说明伦理审批或机构批准情况（如适用）。',
            '提及保护隐私与去标识化措施。'
        ],
        checklist: [
            '写明已取得患者或监护人书面知情同意。',
            '说明伦理委员会审批或豁免情况（若适用）。',
            '强调隐私保护与去标识化处理。'
        ],
        checkKey: 'consent'
    },
    {
        title: '14. 参考文献（可选）', enTitle: 'References (optional)',
        description: '列出引用文献，遵循目标期刊格式并保持对应关系。',
        content: '',
        placeholder: '[1] 作者. 标题. 期刊. 年份;卷(期):页码. DOI\n[2] ...',
        tips: [
            '使用参考文献管理工具保持格式一致。',
            '确保文内引号与参考列表一一对应。',
            '优先引用最新、最相关的研究或指南。'
        ],
        guidelineFocus: [
            '参考文献数量通常 ≥15 条，并与正文引用匹配。',
            '格式需符合目标期刊要求（Vancouver/AMA/APA 等）。',
            '可在提交前使用文献管理工具核对。'
        ],
        checklist: [
            '确保文内引用与参考列表完全对应。',
            '统一参考文献格式与标点。',
            '优先引用近五年的高质量文献。'
        ],
        checkKey: 'references',
        optional: true
    },
    {
        title: '15. 测序数据上传（可选）', enTitle: 'Sequencing Data Upload (optional)',
        description: '将测序原始数据上传至 NCBI 数据库，包括 BioSample、BioProject 和 SRA 的注册与提交。',
        content: '',
        placeholder: '数据上传状态：\n- BioSample ID：\n- BioProject ID：\n- SRA Accession：\n- 上传日期：\n- 备注：',
        tips: [
            '确保原始数据文件（fastq.gz）已准备就绪，文件命名规范。',
            '按照 NCBI 要求填写样本和项目元数据信息。',
            '上传前检查数据质量和完整性，确保符合 SRA 提交标准。',
            '保存所有提交后的 Accession 号码，用于论文引用。'
        ],
        guidelineFocus: [
            '完成 NCBI 账户注册并登录系统。',
            '创建 BioSample 记录，填写样本详细信息。',
            '创建 BioProject 记录，关联相关样本。',
            '通过 SRA 提交序列数据，获取 Accession 号码。'
        ],
        checklist: [
            '已完成 NCBI 账户注册和登录。',
            '已创建 BioSample 并获取 Sample ID。',
            '已创建 BioProject 并获取 Project ID。',
            '已通过 SRA 提交序列数据并获取 Accession。',
            '已记录所有 Accession 号码用于论文引用。'
        ],
        checkKey: 'sequencing-upload',
        isSpecialSection: true,
        optional: true
    }
];

const DEFAULT_SELF_CHECK_ITEMS = [
    { id: 'scope', text: '病例符合 CARE 指南建议报告的情境（罕见、诊疗反转或具有教学价值）。', hint: '确认病例具有独特性或填补知识空白。' },
    { id: 'data', text: '关键诊疗节点（标题至随访）均已完成内容填写并配有时间线。', hint: '核对 13 个条目是否均有草稿。' },
    { id: 'ethics', text: '已获得患者/代理人书面知情同意，并明确记录伦理审批情况。', hint: '尤其注意影像、罕见疾病或敏感信息。' },
    { id: 'privacy', text: '文稿、图表和补充材料均完成去标识化处理。', hint: '检查姓名、住址、影像 DICOM 标签等信息。' },
    { id: 'literature', text: '引言与讨论引用了最新且相关的文献并保持格式一致。', hint: '至少回顾近 5 年的主要研究或指南。' },
    { id: 'takeaway', text: '总结出清晰的教学要点和对临床实践的启示。', hint: '将 1-3 条经验放入摘要或讨论结尾。' }
];

const createSelfCheckItems = () =>
    DEFAULT_SELF_CHECK_ITEMS.map(item => ({ ...item, checked: false }));

createApp({
    data() {
        return {
            currentView: 'writing',
            activeSection: 0,
            showVersionInfo: false,
            journalFilter: '',
            journalTopicFilter: '',
            journalOAFilter: '',
            journalAcceptsFilter: '',
            journalVerifiedOnly: false,
            showAdvancedJournalFields: false,
            // 模板库相关
            templateFilter: '',
            templateCategoryFilter: '',
            templatesData: null,
            templateCategoryStates: {},
            loadingTemplates: false,
            selectedMultiFileItem: null,
            releaseInfo: {
                version: '1.0',
                downloadBaseUrl: 'https://github.com/Bupoo123/CaseWriter/releases/download/v1.0'
            },
            careSections: createCareSections(),
            checklistState: {},
            careSelfCheckItems: createSelfCheckItems(),
            // 时间线编辑器数据
            timelineEvents: [],
            timelineForm: { date: '', event: '', note: '' },
            uploadStatus: {
                step1: false,
                step2: false,
                step3: false,
                step4: false
            },
            uploadData: {
                bioSampleId: '',
                bioProjectId: '',
                sraAccession: '',
                uploadDate: ''
            },
            showImageModal: null,
            abstractForm: {
                introduction: '',
                casePresentation: '',
                management: '',
                conclusion: '',
                learningPoints: ''
            },
            suspendAbstractWatcher: false,
            writingGuides: [
                {
                    title: '1）什么是病例报告',
                    type: 'text',
                    content: [
                        '病例报告（Case report）是描述一个或多个患者所经历的医学问题，详细记录病因、诊断、治疗、预后及随访，以服务医学、科研或教学目的。'
                    ]
                },
                {
                    title: '2）什么是 CARE 指南',
                    type: 'text',
                    content: [
                        'CARE 指南由国际专家小组制定，旨在提升病例报告的准确性、透明度和实用性。该指南 2013 年发布，2017 年在《Journal of Clinical Epidemiology》发表实例阐释，现已被多家期刊采纳并翻译成多种语言。',
                        'CARE 指南包括 CARE 检查表（13 个条目）与 CARE 流程图：检查表提供写作框架，流程图指导作者按时间顺序收集临床信息。'
                    ]
                },
                {
                    title: '3）CARE 指南核心原则',
                    type: 'text',
                    content: [
                        'CARE（CAse REport）指南强调透明度、完整性与患者参与，确保病例信息可重复和可验证。',
                        '报告需覆盖标题至知情同意的 13 个条目，并建议在引言中声明遵循 CARE。',
                        '保持时间顺序、去标识化和充分的临床背景是提升病例质量的关键。'
                    ]
                },
                {
                    title: '4）写作顺序',
                    type: 'tips',
                    content: [
                        '拟定题目、收集时间线、描述诊疗事件，并按需要制作图表。',
                        '撰写引言、讨论和总结：引言与讨论需引用文献，讨论中交代管理策略的优势与局限，结论用一段概括最重要发现。',
                        '最后完成摘要、关键词、致谢、知情同意与参考文献排版。'
                    ]
                },
                {
                    title: '5）写作原则',
                    type: 'accordion',
                    content: [
                        {
                            title: '标题与关键词快速校验',
                            bodyType: 'tips',
                            body: [
                                '标题写明病例类型（case report/case study）并突出最关键的症状、诊断或干预。',
                                '关键词选择 2-5 个标准术语（优选 MeSH），并包含 "case report/病例报告"。',
                                '覆盖疾病、病原、诊断技术、人群特征等检索点，方便数据库索引。'
                            ]
                        },
                        {
                            title: '结构式摘要模板',
                            bodyType: 'example',
                            body: `Introduction（背景）：简述疾病背景、诊断挑战并指出本稿遵循 CARE 指南。\n\nCase Presentation（病例介绍）：说明患者人口学信息、主诉、关键检查与诊疗经过。\n\nManagement and Outcomes（诊疗与结局）：突出决策过程、干预细节、随访及不良事件。\n\nConclusion（结论）：用 1-2 句话强调核心教学要点和实践启示。\n\nLearning Points（教学要点）：列出 2-3 条最重要的临床经验。`
                        },
                        {
                            title: '患者信息采集要点',
                            bodyType: 'tips',
                            body: [
                                '记录年龄、性别/性别认同、族群等人口学信息并进行去标识化处理。',
                                '逐条写清主诉、现病史、既往史、合并症、家族史与社会心理因素。',
                                '适度引用患者原话表现主诉或就诊动机，体现 CARE 强调的患者声音。'
                            ]
                        },
                        {
                            title: '诊疗与随访记录技巧',
                            bodyType: 'tips',
                            body: [
                                '时间线同步正文，覆盖就诊、检查、诊断、治疗、随访与结局。',
                                '诊断部分列出关键检查的时间、结果、参考范围与鉴别诊断思路。',
                                '治疗干预参照 TIDieR 框架说明剂量、频次、执行者、不良事件和依从性。'
                            ]
                        },
                        {
                            title: '讨论写作框架',
                            bodyType: 'tips',
                            body: [
                                '第一段回顾病例亮点与核心教学信息。',
                                '中段与文献对照，阐释可能机制、诊疗策略与创新点。',
                                '结尾强调局限性（单例、资料缺口等）与对临床实践/研究的启示。'
                            ]
                        },
                        {
                            title: '伦理与隐私',
                            bodyType: 'tips',
                            body: [
                                '任何可识别信息（姓名、住址、影像标签）均需去标识化或取得额外授权。',
                                '在文稿中明确知情同意、伦理审批或豁免情况以及存档方式。',
                                '敏感影像需单独说明授权来源，必要时使用遮挡或模糊处理。'
                            ]
                        }
                    ]
                },
                {
                    title: '6）常见写作错误',
                    type: 'tips',
                    content: [
                        '标题未写明 case report 或缺少核心现象。',
                        '摘要未体现结构化要素或未突出 take-away lesson。',
                        '正文缺少患者人口学信息、时间线、诊疗细节或知情同意描述。'
                    ]
                },
                {
                    title: '7）图表绘制',
                    type: 'text',
                    content: [
                        '在 Case report 中恰当地使用图表能增强说服力、清晰度与可读性，可将复杂病程、诊断依据和治疗效果直观呈现给读者与审稿人。',
                        '核心图表及绘制指导：',
                        '1. 影像学证据图：X-ray 显示骨折、肺部感染等；CT 展示肿瘤、血管病变或三维重建，应标注扫描期相；MRI 适用于软组织与神经系统，须注明序列；超声和 PET-CT 可展示结节、积液或代谢活性。标注关键区域，可提供治疗前后对比，并在图注中说明成像技术、部位与箭头含义。',
                        '2. 病理学与细胞学图：展示组织病理（H&E）、免疫组化/免疫荧光或细胞学涂片。必须在图注中标注放大倍数与染色方法。',
                        '3. 微生物学与分子生物学结果：mNGS 报告可展示物种谱系图、覆盖度/深度图并圈出疑似病原；培养、药敏或电镜图片需说明实验方法与关键发现。',
                        '4. 其他实验室与检查结果：皮肤病变照片需保护隐私；心电图、电生理等应突出异常波形或指标；必要时说明取材时间。',
                        '5. 病程时间线图：使用统一时间轴，将症状体征、检查、治疗、结局放在不同水平线，使用统一符号（如△▲）指示事件，帮助读者快速理解病程。',
                        '6. 三线表：用单个或多个患者临床信息汇总表总结人口学、症状、实验室指标，并可用于与既往文献对照。'
                    ]
                }
            ],
            journals: [
                {
                    name: 'Heliyon', abbr: 'Heliyon', issn: '2405-8440', eissn: '2405-8440', if2025: '', if5year: '', jifQuartile: '', casDivision: '', selfCiteRate: '', yearlyPubs: '', cnShare: '', acceptsCaseReport: true, warningStatus: '', verified: false,
                    topic: '综合/多学科',
                    publisher: 'Elsevier',
                    oa: '是',
                    apc: '约$1950',
                    submissionUrl: 'https://www.cell.com/heliyon',
                    templateUrl: 'https://www.cell.com/heliyon/guide-for-authors'
                },
                {
                    name: 'Diagnostic Microbiology and Infectious Disease', abbr: 'Diagn Microbiol Infect Dis', issn: '0732-8893', eissn: '1879-0070', if2025: '', if5year: '', jifQuartile: '', casDivision: '', selfCiteRate: '', yearlyPubs: '', cnShare: '', acceptsCaseReport: false, warningStatus: '', verified: false,
                    topic: '临床微生物/感染病',
                    publisher: 'Elsevier',
                    oa: '否（混合）',
                    apc: '可选OA约$3000',
                    submissionUrl: 'https://www.sciencedirect.com/journal/diagnostic-microbiology-and-infectious-disease',
                    templateUrl: 'https://www.elsevier.com/journals/diagnostic-microbiology-and-infectious-disease'
                },
                {
                    name: 'Infection and Drug Resistance', abbr: 'Infect Drug Resist', issn: '1178-6973', eissn: '1178-6973', acceptsCaseReport: true, verified: false,
                    topic: '耐药/感染病',
                    publisher: 'Dove Press',
                    oa: '是',
                    apc: '约$2700',
                    submissionUrl: 'https://www.dovepress.com/infection-and-drug-resistance-journal',
                    templateUrl: 'https://www.dovepress.com/author_guidelines.php?journal_id=56'
                },
                {
                    name: 'BMC Infectious Diseases', abbr: 'BMC Infect Dis', issn: '1471-2334', eissn: '1471-2334', acceptsCaseReport: true, verified: false,
                    topic: '感染病',
                    publisher: 'BMC/Springer Nature',
                    oa: '是',
                    apc: '约£2490',
                    submissionUrl: 'https://bmcinfectdis.biomedcentral.com/',
                    templateUrl: 'https://bmcinfectdis.biomedcentral.com/submission-guidelines'
                },
                {
                    name: 'International Journal of Infectious Diseases', abbr: 'Int J Infect Dis', issn: '1201-9712', eissn: '1878-3511', acceptsCaseReport: true, verified: false,
                    topic: '感染病',
                    publisher: 'Elsevier/ISID',
                    oa: '是',
                    apc: '约$3300',
                    submissionUrl: 'https://www.journals.elsevier.com/international-journal-of-infectious-diseases',
                    templateUrl: 'https://www.elsevier.com/journals/international-journal-of-infectious-diseases'
                },
                {
                    name: 'Journal of Infection in Developing Countries', abbr: 'JIDC', issn: '2036-6590', eissn: '1972-2680', acceptsCaseReport: true, verified: false,
                    topic: '发展中国家感染病',
                    publisher: 'JIDC Foundation',
                    oa: '是',
                    apc: '约€500',
                    submissionUrl: 'https://jidc.org/',
                    templateUrl: 'https://jidc.org/index.php/journal/about/submissions'
                },
                {
                    name: 'Emerging Infectious Diseases', abbr: 'Emerg Infect Dis', issn: '1080-6040', eissn: '1080-6059', acceptsCaseReport: true, verified: false,
                    topic: '新发传染病',
                    publisher: 'CDC (USA)',
                    oa: '否',
                    apc: '免费',
                    submissionUrl: 'https://wwwnc.cdc.gov/eid',
                    templateUrl: 'https://wwwnc.cdc.gov/eid/page/author-guidelines'
                },
                {
                    name: 'IDCases', abbr: 'IDCases', issn: '2214-2509', eissn: '2214-2509', acceptsCaseReport: true, verified: false,
                    topic: '感染病病例报告',
                    publisher: 'Elsevier',
                    oa: '是',
                    apc: '约$1130',
                    submissionUrl: 'https://www.sciencedirect.com/journal/idcases',
                    templateUrl: 'https://www.elsevier.com/journals/idcases'
                },
                {
                    name: 'Frontiers in Public Health', abbr: 'Front Public Health', acceptsCaseReport: true, verified: false,
                    topic: '公共卫生',
                    publisher: 'Frontiers',
                    oa: '是',
                    apc: '约$2950',
                    submissionUrl: 'https://www.frontiersin.org/journals/public-health',
                    templateUrl: 'https://www.frontiersin.org/journals/public-health#author-guidelines'
                },
                {
                    name: 'Frontiers in Cellular and Infection Microbiology', abbr: 'Front Cell Infect Microbiol', acceptsCaseReport: true, verified: false,
                    topic: '细胞与感染微生物学',
                    publisher: 'Frontiers',
                    oa: '是',
                    apc: '约$2950',
                    submissionUrl: 'https://www.frontiersin.org/journals/cellular-and-infection-microbiology',
                    templateUrl: 'https://www.frontiersin.org/journals/cellular-and-infection-microbiology#author-guidelines'
                },
                {
                    name: 'Frontiers in Immunology', abbr: 'Front Immunol', acceptsCaseReport: false, verified: false,
                    topic: '免疫学',
                    publisher: 'Frontiers',
                    oa: '是',
                    apc: '约$2950',
                    submissionUrl: 'https://www.frontiersin.org/journals/immunology',
                    templateUrl: 'https://www.frontiersin.org/journals/immunology#author-guidelines'
                },
                {
                    name: 'Frontiers in Pediatrics', abbr: 'Front Pediatr', acceptsCaseReport: true, verified: false,
                    topic: '儿科学',
                    publisher: 'Frontiers',
                    oa: '是',
                    apc: '约$2950',
                    submissionUrl: 'https://www.frontiersin.org/journals/pediatrics',
                    templateUrl: 'https://www.frontiersin.org/journals/pediatrics#author-guidelines'
                },
                {
                    name: 'Frontiers in Neurology', abbr: 'Front Neurol', acceptsCaseReport: true, verified: false,
                    topic: '神经学',
                    publisher: 'Frontiers',
                    oa: '是',
                    apc: '约$2950',
                    submissionUrl: 'https://www.frontiersin.org/journals/neurology',
                    templateUrl: 'https://www.frontiersin.org/journals/neurology#author-guidelines'
                },
                {
                    name: 'BMC Neurology', abbr: 'BMC Neurol', acceptsCaseReport: true, verified: false,
                    topic: '神经病学',
                    publisher: 'BMC/Springer Nature',
                    oa: '是',
                    apc: '约£2490',
                    submissionUrl: 'https://bmcneurol.biomedcentral.com/',
                    templateUrl: 'https://bmcneurol.biomedcentral.com/submission-guidelines'
                },
                {
                    name: 'BMC Pulmonary Medicine', abbr: 'BMC Pulm Med', acceptsCaseReport: true, verified: false,
                    topic: '呼吸系统疾病',
                    publisher: 'BMC/Springer Nature',
                    oa: '是',
                    apc: '约£2490',
                    submissionUrl: 'https://bmcpulmmed.biomedcentral.com/',
                    templateUrl: 'https://bmcpulmmed.biomedcentral.com/submission-guidelines'
                },
                {
                    name: 'Journal of Medical Case Reports', abbr: 'J Med Case Rep', acceptsCaseReport: true, verified: false,
                    topic: '病例报告',
                    publisher: 'BMC/Springer Nature',
                    oa: '是',
                    apc: '约£1060',
                    submissionUrl: 'https://jmedicalcasereports.biomedcentral.com/',
                    templateUrl: 'https://jmedicalcasereports.biomedcentral.com/submission-guidelines'
                },
                {
                    name: 'Respiratory Medicine Case Reports', abbr: 'Respir Med Case Rep', acceptsCaseReport: true, verified: false,
                    topic: '呼吸病病例报告',
                    publisher: 'Elsevier',
                    oa: '是',
                    apc: '约$600',
                    submissionUrl: 'https://www.sciencedirect.com/journal/respiratory-medicine-case-reports',
                    templateUrl: 'https://www.elsevier.com/journals/respiratory-medicine-case-reports'
                },
                {
                    name: 'American Journal of Ophthalmology Case Reports', abbr: 'Am J Ophthalmol Case Rep', acceptsCaseReport: true, verified: false,
                    topic: '眼科学病例报告',
                    publisher: 'Elsevier',
                    oa: '是',
                    apc: '约$750',
                    submissionUrl: 'https://www.sciencedirect.com/journal/american-journal-of-ophthalmology-case-reports',
                    templateUrl: 'https://www.elsevier.com/journals/american-journal-of-ophthalmology-case-reports'
                },
                {
                    name: 'Clinical Laboratory', abbr: 'Clin Lab', acceptsCaseReport: true, verified: false,
                    topic: '实验室医学',
                    publisher: 'Clin Lab GmbH (Germany)',
                    oa: '否',
                    apc: '免费',
                    submissionUrl: 'https://www.clin-lab-publications.com/',
                    templateUrl: 'https://www.clin-lab-publications.com/instructions.html'
                },
                {
                    name: 'Biological Sciences (De Gruyter)', abbr: 'Biol Sci', acceptsCaseReport: true, verified: false,
                    topic: '综合/生命科学',
                    publisher: 'De Gruyter',
                    oa: '是',
                    apc: '约€1200',
                    submissionUrl: 'https://www.degruyter.com/journal/key/biolsci/html',
                    templateUrl: 'https://www.degruyter.com/journal/key/biolsci/html#instructions'
                }
            ],
            // 价值评估相关数据
            publicationFeatures: [
                {
                    title: '病原体罕见或首次报道',
                    examples: '罕见病原/机会致病菌（如 Balamuthia mandrillaris, Eikenella halliae）；首例/极少报道的病原与疾病部位组合；或首次通过 mNGS 确诊的病原。',
                    reason: '具有"文献价值"和"诊断启示"。'
                },
                {
                    title: '诊断具有挑战性',
                    examples: '常规检测（培养、PCR、免疫学）阴性或误诊；mNGS 在复杂、非典型病例中起关键诊断作用；通常伴随"病程延迟诊断""传统检测无果""经 mNGS 确诊"。',
                    reason: '展示 mNGS 的独特诊断贡献。'
                },
                {
                    title: '感染部位特殊或危险',
                    examples: '中枢神经系统（脑膜炎、脑脓肿、脑炎）；眼部感染（角膜炎、眼内炎）；肺部复杂感染（肺脓肿、弥漫性病灶）；其他无菌体液（血液、心包液、胸水、羊水等）。',
                    reason: '体现 mNGS 在高危、无菌样本类型中的检测优势。'
                },
                {
                    title: '结果对治疗有直接影响',
                    examples: 'mNGS 检测结果引导了靶向抗感染治疗；病情随 mNGS 报告调整方案后改善；对比"治疗前后"疗效变化明确。',
                    reason: 'mNGS 结果改变了临床决策。'
                },
                {
                    title: '结合多组学或联合检测方法',
                    examples: 'mNGS 结合 PCR、病理学、培养、影像学；或与 host response、免疫学指标、耐药基因分析联合使用。',
                    reason: '反映 mNGS 的整合性价值。'
                }
            ],
            evaluationDimensions: [
                {
                    dimension: '病原体罕见',
                    description: '新或少见微生物',
                    value: '⭐⭐⭐⭐'
                },
                {
                    dimension: '检测方法创新',
                    description: '首次用 mNGS 发现/确诊',
                    value: '⭐⭐⭐⭐'
                },
                {
                    dimension: '临床误诊反转',
                    description: '传统检测阴性，mNGS 确诊',
                    value: '⭐⭐⭐⭐'
                },
                {
                    dimension: '感染部位特殊',
                    description: 'CNS、眼部、心内膜、产科',
                    value: '⭐⭐⭐'
                },
                {
                    dimension: '治疗转折点',
                    description: 'mNGS 结果指导用药',
                    value: '⭐⭐⭐⭐'
                },
                {
                    dimension: '首例/少数报道',
                    description: '"first case" "rare pathogen" 明确',
                    value: '⭐⭐⭐⭐⭐'
                },
                {
                    dimension: '联合验证',
                    description: 'mNGS + PCR 或培养确认',
                    value: '⭐⭐⭐'
                },
                {
                    dimension: '学术语言完整',
                    description: '含诊断流程、时间线、结局、图像',
                    value: '⭐⭐⭐⭐'
                }
            ]
        };
    },
    computed: {
        abstractSectionIndex() {
            return this.careSections.findIndex(section => section.checkKey === 'abstract');
        },
        currentSection() {
            if (this.activeSection === null) return null;
            return this.careSections[this.activeSection] || null;
        },
        currentSectionEvaluation() {
            if (this.activeSection === null) return null;
            return this.evaluateSectionContent(this.careSections[this.activeSection], this.activeSection);
        },
        currentSectionWordCount() {
            return this.currentSection ? this.getWordCount(this.currentSection.content) : 0;
        },
        currentSectionWordLimitLabel() {
            const section = this.currentSection;
            if (!section || !section.wordLimit) return '';
            const { min, max, type } = section.wordLimit;
            const unit = type === 'characters' ? '字' : '词';
            if (min && max) {
                return `建议 ${min}-${max}${unit}`;
            }
            if (min) {
                return `建议不少于 ${min}${unit}`;
            }
            if (max) {
                return `建议不超过 ${max}${unit}`;
            }
            return '';
        },
        currentChecklistProgress() {
            if (this.activeSection === null) return null;
            return this.getChecklistProgress(this.activeSection);
        },
        currentSectionKeywords() {
            if (!this.currentSection || this.currentSection.checkKey !== 'keywords') return [];
            return this.extractKeywords(this.currentSection.content);
        },
        currentKeywordIncludesCaseReport() {
            return this.currentSectionKeywords.some(keyword => /case report|病例报告/i.test(keyword));
        },
        complianceOverview() {
            return this.careSections.map((section, index) => {
                const evaluation = this.evaluateSectionContent(section, index);
                return {
                    index,
                    title: section.title,
                    status: evaluation.status,
                    optional: !!section.optional,
                    issues: evaluation.issues,
                    checklistProgress: this.getChecklistProgress(index)
                };
            });
        },
        careProgress() {
            const mandatory = this.complianceOverview.filter(item => !item.optional);
            const completed = mandatory.filter(item => item.status === 'pass').length;
            const total = mandatory.length;
            const percent = total ? Math.round((completed / total) * 100) : 0;
            return { completed, total, percent };
        },
        selfCheckProgress() {
            const total = this.careSelfCheckItems.length;
            const completed = this.careSelfCheckItems.filter(item => item.checked).length;
            const percent = total ? Math.round((completed / total) * 100) : 0;
            return { total, completed, percent };
        },
        journalTopics() {
            return [...new Set(this.journals.map(j => j.topic))];
        },
        filteredJournals() {
            let filtered = this.journals;
            
            if (this.journalFilter) {
                const filter = this.journalFilter.toLowerCase();
                filtered = filtered.filter(j => 
                    (j.name && j.name.toLowerCase().includes(filter)) ||
                    j.topic.toLowerCase().includes(filter) ||
                    j.publisher.toLowerCase().includes(filter) ||
                    j.apc.toLowerCase().includes(filter)
                );
            }
            
            if (this.journalTopicFilter) {
                filtered = filtered.filter(j => j.topic === this.journalTopicFilter);
            }
            
            if (this.journalOAFilter) {
                filtered = filtered.filter(j => j.oa.includes(this.journalOAFilter));
            }

            if (this.journalAcceptsFilter === '接收') {
                filtered = filtered.filter(j => j.acceptsCaseReport === true);
            } else if (this.journalAcceptsFilter === '不接收') {
                filtered = filtered.filter(j => j.acceptsCaseReport === false);
            }

            if (this.journalVerifiedOnly) {
                filtered = filtered.filter(j => j.verified === true);
            }
            
            return filtered;
        },
        filteredTemplateGroups() {
            if (!this.templatesData) return [];

            let filteredItems = this.getAllTemplateItems();

            if (this.templateCategoryFilter) {
                filteredItems = filteredItems.filter(item => item.category === this.templateCategoryFilter);
            }

            if (this.templateFilter) {
                const filter = this.templateFilter.toLowerCase();
                filteredItems = filteredItems.filter(item =>
                    item.name.toLowerCase().includes(filter) ||
                    (item.description && item.description.toLowerCase().includes(filter)) ||
                    (item.journal && item.journal.toLowerCase().includes(filter)) ||
                    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(filter)))
                );
            }

            const categoryOrder = ['指南和清单', '杰毅生物合作发表案例', '经典高分案例'];
            const groupedMap = new Map();

            filteredItems.forEach(item => {
                const category = item.category || '其他资源';
                if (!groupedMap.has(category)) {
                    groupedMap.set(category, []);
                }
                groupedMap.get(category).push(item);
            });

            const groups = [];

            categoryOrder.forEach(category => {
                if (groupedMap.has(category)) {
                    groups.push({ category, items: groupedMap.get(category) });
                    groupedMap.delete(category);
                }
            });

            Array.from(groupedMap.keys()).sort().forEach(category => {
                groups.push({ category, items: groupedMap.get(category) });
            });

            return groups;
        }
    },
    watch: {
        templateCategoryFilter(newValue) {
            if (newValue) {
                this.templateCategoryStates[newValue] = true;
            }
        },
        templateFilter(newValue) {
            if (newValue) {
                this.expandAllTemplateCategories();
            }
        },
        abstractForm: {
            handler() {
                if (this.suspendAbstractWatcher) return;
                this.updateAbstractFromForm();
            },
            deep: true
        },
        activeSection(newIndex) {
            const section = this.careSections[newIndex];
            if (section && section.checkKey === 'abstract') {
                this.syncAbstractFormFromContent(section.content);
            }
        }
    },
    created() {
        this.resetChecklistState();
    },
    mounted() {
        const loaded = this.loadFromLocalSilent();
        if (!loaded) {
            this.newCase();
        } else {
            this.ensureChecklistStateIntegrity();
            if (this.activeSection === null || this.activeSection >= this.careSections.length) {
                this.activeSection = 0;
            }
        }
        const abstractSection = this.careSections[this.abstractSectionIndex];
        this.syncAbstractFormFromContent(abstractSection ? abstractSection.content : '');
        this.loadTemplates();
    },
    methods: {
        getAllTemplateItems() {
            if (!this.templatesData) return [];
            // 合并清单和指南为"指南和清单"
            const allItems = [
                ...(this.templatesData.checklists || []),
                ...(this.templatesData.guidelines || []),
                ...(this.templatesData.publishedCases || []),
                ...(this.templatesData.classicCases || [])
            ];
            // 统一分类名称
            return allItems.map(item => {
                if (item.category === '清单' || item.category === '指南') {
                    return { ...item, category: '指南和清单' };
                } else if (item.category === '已发表案例') {
                    return { ...item, category: '杰毅生物合作发表案例' };
                }
                return item;
            });
        },
        initializeTemplateCategoryStates() {
            const categories = new Set();
            this.getAllTemplateItems().forEach(item => {
                categories.add(item.category || '其他资源');
            });
            categories.forEach(category => {
                if (!(category in this.templateCategoryStates)) {
                    this.templateCategoryStates[category] = true;
                }
            });
        },
        expandAllTemplateCategories() {
            Object.keys(this.templateCategoryStates).forEach(category => {
                this.templateCategoryStates[category] = true;
            });
        },
        isTemplateCategoryExpanded(category) {
            const state = this.templateCategoryStates[category];
            return state === undefined ? true : state;
        },
        toggleTemplateCategory(category) {
            const current = this.isTemplateCategoryExpanded(category);
            this.templateCategoryStates[category] = !current;
        },
        getDefaultAbstractForm() {
            return {
                introduction: '',
                casePresentation: '',
                management: '',
                conclusion: '',
                learningPoints: ''
            };
        },
        syncAbstractFormFromContent(content) {
            const defaults = this.getDefaultAbstractForm();
            if (this.abstractSectionIndex === -1) {
                this.suspendAbstractWatcher = true;
                this.abstractForm = { ...defaults };
                this.$nextTick(() => {
                    this.suspendAbstractWatcher = false;
                });
                return;
            }

            const normalized = (content || '').trim();
            const sections = { ...defaults };

            if (normalized) {
                const markerDefinitions = [
                    { key: 'introduction', labels: ['Introduction', '背景'] },
                    { key: 'casePresentation', labels: ['Case Presentation', '病例介绍', 'Case description'] },
                    { key: 'management', labels: ['Management and Outcomes', 'Management', '诊疗与结局', '诊疗', 'Outcomes'] },
                    { key: 'conclusion', labels: ['Conclusion', '结论'] },
                    { key: 'learningPoints', labels: ['Learning Points', '教学要点', 'Learning point', 'Lessons'] }
                ];

                const markers = [];

                markerDefinitions.forEach(def => {
                    for (const label of def.labels) {
                        const regex = new RegExp(`${label}(?:（[^）]*）)?\s*[：:]`, 'i');
                        const match = regex.exec(normalized);
                        if (match) {
                            markers.push({
                                key: def.key,
                                index: match.index,
                                length: match[0].length
                            });
                            break;
                        }
                    }
                });

                markers.sort((a, b) => a.index - b.index);

                markers.forEach((marker, idx) => {
                    const start = marker.index + marker.length;
                    const end = idx < markers.length - 1 ? markers[idx + 1].index : normalized.length;
                    const raw = normalized.slice(start, end).trim();
                    if (!raw) return;
                    if (marker.key === 'learningPoints') {
                        const cleaned = raw
                            .split(/\n+/)
                            .map(line => line.replace(/^[-•\u2022\u25cf\u25aa\s]+/, '').trim())
                            .filter(Boolean)
                            .join('\n');
                        sections[marker.key] = cleaned;
                    } else {
                        sections[marker.key] = raw.replace(/\r?\n/g, '\n').trim();
                    }
                });
            }

            this.suspendAbstractWatcher = true;
            this.abstractForm = { ...sections };
            this.$nextTick(() => {
                this.suspendAbstractWatcher = false;
            });
        },
        updateAbstractFromForm() {
            const idx = this.abstractSectionIndex;
            if (idx === -1) return;

            const labels = {
                introduction: 'Introduction（背景）',
                casePresentation: 'Case Presentation（病例介绍）',
                management: 'Management and Outcomes（诊疗与结局）',
                conclusion: 'Conclusion（结论）',
                learningPoints: 'Learning Points（教学要点）'
            };

            const segments = [];
            const pushSegment = (key, formatter) => {
                const value = (this.abstractForm[key] || '').trim();
                if (!value) return;
                const segmentText = formatter ? formatter(value) : value;
                segments.push(`${labels[key]}：${segmentText}`);
            };

            pushSegment('introduction');
            pushSegment('casePresentation');
            pushSegment('management');
            pushSegment('conclusion');
            pushSegment('learningPoints', value => {
                const lines = value
                    .split(/\n+/)
                    .map(line => line.trim())
                    .filter(Boolean)
                    .map(line => (line.startsWith('-') ? line : `- ${line}`));
                return lines.length ? `\n${lines.join('\n')}` : '';
            });

            const combined = segments.join('\n\n').trim();
            const current = (this.careSections[idx].content || '').trim();
            if (combined === current) return;
            this.careSections[idx].content = combined;
            this.autoSave();
        },
        handleSectionInput(sectionIndex) {
            this.autoSave();
            const section = this.careSections[sectionIndex];
            if (section && section.checkKey === 'abstract') {
                this.syncAbstractFormFromContent(section.content);
            }
        },
        resetChecklistState() {
            const state = {};
            this.careSections.forEach((section, index) => {
                if (Array.isArray(section.checklist) && section.checklist.length) {
                    state[index] = section.checklist.map(() => false);
                }
            });
            this.checklistState = state;
        },
        ensureChecklistStateIntegrity() {
            const state = { ...this.checklistState };
            this.careSections.forEach((section, index) => {
                if (Array.isArray(section.checklist) && section.checklist.length) {
                    const existing = Array.isArray(state[index]) ? state[index] : [];
                    state[index] = section.checklist.map((_, i) => Boolean(existing[i]));
                }
            });
            this.checklistState = state;
        },
        getChecklistProgress(sectionIndex) {
            const section = this.careSections[sectionIndex];
            if (!section || !Array.isArray(section.checklist) || !section.checklist.length) {
                return { total: 0, completed: 0, percent: 0 };
            }
            const state = this.checklistState[sectionIndex] || [];
            const completed = state.filter(Boolean).length;
            const total = section.checklist.length;
            return {
                total,
                completed,
                percent: total ? Math.round((completed / total) * 100) : 0
            };
        },
        isChecklistItemChecked(sectionIndex, itemIndex) {
            const state = this.checklistState[sectionIndex];
            return Array.isArray(state) ? Boolean(state[itemIndex]) : false;
        },
        toggleChecklistItem(sectionIndex, itemIndex) {
            const section = this.careSections[sectionIndex];
            if (!section || !Array.isArray(section.checklist)) return;
            const current = Array.isArray(this.checklistState[sectionIndex])
                ? [...this.checklistState[sectionIndex]]
                : section.checklist.map(() => false);
            current[itemIndex] = !current[itemIndex];
            this.checklistState = { ...this.checklistState, [sectionIndex]: current };
            this.autoSave();
        },
        toggleSelfCheck(id) {
            this.careSelfCheckItems = this.careSelfCheckItems.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            );
            this.autoSave();
        },
        restoreSelfCheckItems(savedItems) {
            const savedMap = new Map((savedItems || []).map(item => [item.id, !!item.checked]));
            this.careSelfCheckItems = createSelfCheckItems().map(item => ({
                ...item,
                checked: savedMap.has(item.id) ? savedMap.get(item.id) : false
            }));
        },
        getStatusIcon(status, optional = false) {
            switch (status) {
                case 'pass':
                    return '✅';
                case 'warn':
                    return '⚠️';
                case 'fail':
                    return '❗️';
                case 'optional':
                    return '◇';
                case 'pending':
                    return optional ? '◇' : '…';
                default:
                    return '…';
            }
        },
        getStatusLabel(status, optional = false) {
            switch (status) {
                case 'pass':
                    return '已达标';
                case 'warn':
                    return '需优化';
                case 'fail':
                    return '不符合';
                case 'optional':
                    return '可选';
                case 'pending':
                    return optional ? '可选未填' : '待完成';
                default:
                    return '待检查';
            }
        },
        getWordCount(text) {
            if (!text) return 0;
            const englishWords = text.trim().split(/\s+/).filter(Boolean).length;
            const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
            return englishWords + Math.round(chineseChars / 2);
        },
        extractKeywords(raw) {
            if (!raw) return [];
            return raw
                .split(/[;,；，、\n]+/)
                .map(keyword => keyword.trim())
                .filter(Boolean);
        },
        evaluateSectionContent(section, index) {
            if (!section) {
                return { status: 'pending', issues: [], wordCount: 0, optional: false };
            }
            const content = (section.content || '').trim();
            const optional = !!section.optional;
            const issues = [];
            const wordCount = this.getWordCount(content);

            const pushIssue = (level, text) => {
                issues.push({ level, text });
            };

            if (!content) {
                if (optional) {
                    return { status: 'optional', issues: [], wordCount, optional };
                }
                pushIssue('error', '该章节尚未填写。');
                return { status: 'pending', issues, wordCount, optional };
            }

            if (section.wordLimit) {
                const { min, max } = section.wordLimit;
                if (min && wordCount < min) {
                    pushIssue('warn', `当前约 ${wordCount} 词，低于建议的 ${min} 词。`);
                }
                if (max && wordCount > max) {
                    pushIssue('warn', `当前约 ${wordCount} 词，高于建议的 ${max} 词。`);
                }
            }

            switch (section.checkKey) {
                case 'title': {
                    if (!/case report|病例报告/i.test(content)) {
                        pushIssue('error', '标题需包含 "case report/病例报告" 字样。');
                    }
                    if (wordCount > 16) {
                        pushIssue('warn', '标题偏长，建议控制在 15 词以内。');
                    }
                    break;
                }
                case 'keywords': {
                    const keywords = this.extractKeywords(content);
                    if (keywords.length < 3) {
                        pushIssue('error', '关键词至少需 3 个，可使用分号或逗号分隔。');
                    }
                    if (keywords.length > 6) {
                        pushIssue('warn', '关键词建议保留 3-6 个核心词。');
                    }
                    const includesCaseReport = keywords.some(keyword => /case report|病例报告/i.test(keyword));
                    if (!includesCaseReport) {
                        pushIssue('error', '请将 "case report/病例报告" 作为关键词之一。');
                    }
                    break;
                }
                case 'abstract': {
                    if (!/Introduction|背景/.test(content)) {
                        pushIssue('warn', '摘要建议包含背景（Introduction）。');
                    }
                    if (!/Case Presentation|病例|Case description/i.test(content)) {
                        pushIssue('warn', '摘要应清晰描述病例经过。');
                    }
                    if (!/Conclusion|结论/.test(content)) {
                        pushIssue('warn', '摘要建议包含结论段。');
                    }
                    if (!/Learning|教学要点|take-away/i.test(content)) {
                        pushIssue('warn', '摘要需强调教学要点或 take-away lesson。');
                    }
                    break;
                }
                case 'introduction': {
                    if (!/CARE/i.test(content)) {
                        pushIssue('error', '引言需声明本报告遵循 CARE 指南。');
                    }
                    if (!/文献|literature|reported/i.test(content)) {
                        pushIssue('warn', '引言可补充关键文献或病例背景。');
                    }
                    break;
                }
                case 'patient-info': {
                    if (!/(\d{1,3}\s?(岁|year|years|y\/o|yo))/i.test(content)) {
                        pushIssue('warn', '建议标注患者年龄信息（已匿名）。');
                    }
                    if (!/(男|女|male|female)/i.test(content)) {
                        pushIssue('warn', '建议说明患者性别或性别认同。');
                    }
                    if (!/(主诉|chief complaint)/i.test(content)) {
                        pushIssue('warn', '请记录患者主诉或就诊原因。');
                    }
                    if (!/(既往|past medical|comorbidity|合并)/i.test(content)) {
                        pushIssue('warn', '建议补充既往史、共病或相关背景。');
                    }
                    break;
                }
                case 'clinical-findings': {
                    if (!/(体格|physical examination)/i.test(content)) {
                        pushIssue('warn', '临床发现应描述体格检查要点。');
                    }
                    if (!/(生命体征|vital)/i.test(content)) {
                        pushIssue('warn', '建议补充生命体征信息。');
                    }
                    break;
                }
                case 'timeline': {
                    if (this.timelineEvents.length && !content.includes('|')) {
                        pushIssue('warn', '时间线可使用同步按钮生成表格以保证结构化。');
                    }
                    if (!/(\d{4}|\d{2}-\d{2}|日期|day)/.test(content)) {
                        pushIssue('warn', '请确保时间线包含清晰的日期或时间节点。');
                    }
                    break;
                }
                case 'diagnostic': {
                    if (!/(鉴别|differential)/i.test(content)) {
                        pushIssue('warn', '建议描述鉴别诊断与排除依据。');
                    }
                    if (!/(参考|reference range|范围)/i.test(content)) {
                        pushIssue('warn', '关键检查应注明参考范围或阈值。');
                    }
                    if (!/(挑战|困难|delay|误诊)/i.test(content)) {
                        pushIssue('warn', '可补充诊断挑战或误诊因素。');
                    }
                    break;
                }
                case 'therapeutic': {
                    if (!/(剂量|dose|mg|给药)/i.test(content)) {
                        pushIssue('warn', '建议注明治疗剂量、频次或给药方式。');
                    }
                    if (!/(不良|adverse)/i.test(content)) {
                        pushIssue('warn', '请记录不良事件（若无亦应说明）。');
                    }
                    if (!/(依从|adherence|compliance)/i.test(content)) {
                        pushIssue('warn', '可说明患者依从性或治疗执行情况。');
                    }
                    break;
                }
                case 'follow-up': {
                    if (!/(随访|follow)/i.test(content)) {
                        pushIssue('warn', '请记录随访时间点与结果。');
                    }
                    if (!/(结局|outcome|恢复)/i.test(content)) {
                        pushIssue('warn', '建议描述临床结局或患者感知结果。');
                    }
                    if (!/(不良|复发|adverse)/i.test(content)) {
                        pushIssue('warn', '需说明是否出现不良事件或复发。');
                    }
                    break;
                }
                case 'discussion': {
                    if (!/(文献|literature|reported)/i.test(content)) {
                        pushIssue('warn', '讨论应与相关文献或病例对照。');
                    }
                    if (!/(局限|limitation)/i.test(content)) {
                        pushIssue('warn', '请明确病例的局限性。');
                    }
                    if (!/(教训|take-away|lesson|启示)/i.test(content)) {
                        pushIssue('warn', '建议强调核心教学启示或实践建议。');
                    }
                    break;
                }
                case 'patient-perspective': {
                    if (wordCount < 30) {
                        pushIssue('warn', '患者观点篇幅较短，可补充更多真实体验。');
                    }
                    break;
                }
                case 'consent': {
                    if (!/(知情|consent)/i.test(content)) {
                        pushIssue('error', '需明确写出已获得患者/监护人的知情同意。');
                    }
                    if (!/(伦理|ethic)/i.test(content)) {
                        pushIssue('warn', '建议说明伦理审批或豁免情况。');
                    }
                    break;
                }
                case 'references': {
                    if (!/\[[0-9]+\]/.test(content)) {
                        pushIssue('warn', '参考文献建议使用编号格式并与正文对应。');
                    }
                    if (!/(doi|https?:\/\/)/i.test(content)) {
                        pushIssue('warn', '可补充 DOI 或链接以提升可追溯性。');
                    }
                    break;
                }
                default:
                    break;
            }

            let status = 'pass';
            if (issues.some(issue => issue.level === 'error')) {
                status = 'fail';
            } else if (issues.some(issue => issue.level === 'warn')) {
                status = 'warn';
            }

            return { status, issues, wordCount, optional };
        },
        autoSave() {
            const data = {
                sectionsContent: this.careSections.map(section => section.content),
                careSections: this.careSections.map(section => ({ content: section.content })),
                timelineEvents: this.timelineEvents,
                checklistState: this.checklistState,
                careSelfCheckItems: this.careSelfCheckItems,
                abstractForm: { ...this.abstractForm },
                uploadStatus: { ...this.uploadStatus },
                uploadData: { ...this.uploadData },
                activeSection: this.activeSection,
                lastSaved: new Date().toISOString()
            };
            localStorage.setItem('casewriter_data', JSON.stringify(data));
        },
        saveToLocal() {
            this.autoSave();
            alert('数据已保存到本地存储！');
        },
        loadFromLocalSilent() {
            const saved = localStorage.getItem('casewriter_data');
            if (!saved) {
                return false;
            }
            try {
                const data = JSON.parse(saved);
                if (Array.isArray(data.sectionsContent)) {
                    data.sectionsContent.forEach((content, index) => {
                        if (this.careSections[index]) {
                            this.careSections[index].content = content || '';
                        }
                    });
                } else if (Array.isArray(data.careSections)) {
                    data.careSections.forEach((savedSection, index) => {
                        if (this.careSections[index]) {
                            this.careSections[index].content = savedSection.content || '';
                        }
                    });
                }
                if (Array.isArray(data.timelineEvents)) {
                    this.timelineEvents = data.timelineEvents;
                }
                if (data.checklistState) {
                    this.checklistState = data.checklistState;
                    this.ensureChecklistStateIntegrity();
                }
                if (data.uploadStatus) {
                    this.uploadStatus = { ...this.uploadStatus, ...data.uploadStatus };
                }
                if (data.uploadData) {
                    this.uploadData = { ...this.uploadData, ...data.uploadData };
                }
                if (Array.isArray(data.careSelfCheckItems)) {
                    this.restoreSelfCheckItems(data.careSelfCheckItems);
                }
                if (data.abstractForm) {
                    this.suspendAbstractWatcher = true;
                    this.abstractForm = { ...this.getDefaultAbstractForm(), ...data.abstractForm };
                    this.$nextTick(() => {
                        this.suspendAbstractWatcher = false;
                    });
                }
                if (typeof data.activeSection === 'number') {
                    this.activeSection = data.activeSection;
                }
                return true;
            } catch (e) {
                console.error('加载数据失败:', e);
                return false;
            }
        },
        loadFromLocal() {
            if (this.loadFromLocalSilent()) {
                alert('数据已从本地存储加载！');
            } else {
                alert('未找到保存的数据或数据格式不正确。');
            }
        },
        exportToWord() {
            try {
                // 生成 HTML 格式的 Word 文档
                let html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>病例报告</title>
    <style>
        body { font-family: 'Microsoft YaHei', Arial, sans-serif; line-height: 1.6; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 30px; }
        h2 { color: #555; margin-top: 25px; }
        p { margin: 10px 0; text-align: justify; }
        .description { color: #666; font-style: italic; margin-bottom: 15px; }
        .content { white-space: pre-wrap; margin: 15px 0; }
    </style>
</head>
<body>
    <h1>病例报告</h1>
    <p><em>生成时间: ${new Date().toLocaleString('zh-CN')}</em></p>
    <hr>
`;
                
                this.careSections.forEach(section => {
                    if (section.content.trim()) {
                        const head = section.enTitle ? `${section.title} (${section.enTitle})` : section.title;
                        html += `    <h1>${head}</h1>\n`;
                        
                        if (section.description) {
                            html += `    <p class="description">${section.description}</p>\n`;
                        }
                        
                        // 将内容按行处理，保持格式
                        const contentLines = section.content.split('\n');
                        contentLines.forEach(line => {
                            if (line.trim()) {
                                html += `    <p>${this.escapeHtml(line)}</p>\n`;
                            } else {
                                html += `    <br>\n`;
                            }
                        });
                        
                        html += `    <hr>\n`;
                    }
                });
                
                html += `</body>\n</html>`;
                
                // 创建 Blob 并保存
                const blob = new Blob(['\ufeff' + html], { 
                    type: 'application/msword;charset=utf-8' 
                });
                saveAs(blob, 'CaseReport.doc');
                alert('Word 文档导出成功！');
            } catch (e) {
                console.error('导出 Word 失败:', e);
                alert('导出 Word 失败，请检查浏览器兼容性。');
            }
        },
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },
        exportToMarkdown() {
            try {
                let markdown = '# 病例报告\n\n';
                markdown += `*生成时间: ${new Date().toLocaleString('zh-CN')}*\n\n`;
                markdown += '---\n\n';
                
                this.careSections.forEach(section => {
                    if (section.content.trim()) {
                        const head = section.enTitle ? `${section.title} (${section.enTitle})` : section.title;
                        markdown += `## ${head}\n\n`;
                        
                        if (section.description) {
                            markdown += `*${section.description}*\n\n`;
                        }
                        
                        markdown += section.content + '\n\n';
                        markdown += '---\n\n';
                    }
                });
                
                // 创建下载链接
                const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
                saveAs(blob, 'CaseReport.md');
                alert('Markdown 文档导出成功！');
            } catch (e) {
                console.error('导出 Markdown 失败:', e);
                alert('导出 Markdown 失败，请检查浏览器兼容性。');
            }
        },
        openJournal(url) {
            window.open(url, '_blank');
        },
        // 模板库相关方法
        async loadTemplates() {
            this.loadingTemplates = true;
            try {
                const response = await fetch('data/templates.json');
                if (response.ok) {
                    this.templatesData = await response.json();
                    this.initializeTemplateCategoryStates();
                    // 更新releaseInfo
                    if (this.templatesData.releaseInfo) {
                        this.releaseInfo = this.templatesData.releaseInfo;
                    }
                } else {
                    console.error('加载模板数据失败:', response.status);
                    alert('加载模板库失败，请检查网络连接或联系管理员。');
                }
            } catch (error) {
                console.error('加载模板数据错误:', error);
                alert('加载模板库失败，请检查网络连接或联系管理员。');
            } finally {
                this.loadingTemplates = false;
            }
        },
        getDownloadUrl(item) {
            // 单文件下载
            const filePath = item.file || (item.files && item.files[0]);
            if (!filePath) return '#';
            
            // 从文件路径提取文件名
            let fileName = filePath.split('/').pop();
            
            // GitHub上传时会转换文件名：空格和特殊字符变成点，中文可能被转换
            // 尝试匹配实际的文件名
            if (this.templatesData && this.templatesData.fileMapping) {
                const mapped = this.templatesData.fileMapping[fileName];
                if (mapped) fileName = mapped;
            } else {
                // 如果没有映射表，尝试转换文件名（空格变点，保留扩展名）
                const ext = fileName.substring(fileName.lastIndexOf('.'));
                const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
                fileName = nameWithoutExt.replace(/[\s\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g, '.').replace(/\.+/g, '.') + ext;
            }
            
            // 构建GitHub Releases下载URL
            return `${this.releaseInfo.downloadBaseUrl}/${encodeURIComponent(fileName)}`;
        },
        getFileDownloadUrl(filePath) {
            // 多文件下载
            let fileName = filePath.split('/').pop();
            
            // 尝试匹配实际的文件名
            if (this.templatesData && this.templatesData.fileMapping) {
                const mapped = this.templatesData.fileMapping[fileName];
                if (mapped) fileName = mapped;
            } else {
                // 转换文件名
                const ext = fileName.substring(fileName.lastIndexOf('.'));
                const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
                fileName = nameWithoutExt.replace(/[\s\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g, '.').replace(/\.+/g, '.') + ext;
            }
            
            return `${this.releaseInfo.downloadBaseUrl}/${encodeURIComponent(fileName)}`;
        },
        getFileName(filePath) {
            return filePath.split('/').pop();
        },
        showMultiFileDialog(item) {
            this.selectedMultiFileItem = item;
        },
        // 新建病例：清空所有章节内容与时间线
        newCase() {
            this.careSections.forEach(section => {
                section.content = '';
            });
            this.resetChecklistState();
            this.careSelfCheckItems = createSelfCheckItems();
            this.timelineEvents = [];
            this.timelineForm = { date: '', event: '', note: '' };
            this.uploadStatus = { step1: false, step2: false, step3: false, step4: false };
            this.uploadData = { bioSampleId: '', bioProjectId: '', sraAccession: '', uploadDate: '' };
            this.suspendAbstractWatcher = true;
            this.abstractForm = this.getDefaultAbstractForm();
            this.$nextTick(() => {
                this.suspendAbstractWatcher = false;
            });
            this.activeSection = 0;
            this.autoSave();
        },
        addTimelineEvent() {
            if (!this.timelineForm.date || !this.timelineForm.event) return;
            this.timelineEvents.push({ ...this.timelineForm });
            this.timelineForm = { date: '', event: '', note: '' };
            this.autoSave();
        },
        removeTimelineEvent(index) {
            this.timelineEvents.splice(index, 1);
            this.autoSave();
        },
        generateTimelineMarkdown() {
            if (!this.timelineEvents.length) return '';
            let md = '| 日期 | 事件 | 备注 |\n|---|---|---|\n';
            this.timelineEvents.forEach(ev => {
                md += `| ${ev.date} | ${ev.event} | ${ev.note || ''} |\n`;
            });
            return md;
        },
        syncTimelineToContent() {
            const md = this.generateTimelineMarkdown();
            if (!md) return;
            const idx = this.careSections.findIndex(s => s.title.startsWith('7.'));
            if (idx !== -1) {
                this.careSections[idx].content = md;
            }
            this.autoSave();
            alert('已同步时间线表格到编辑器');
        },
        getStepImages(stepFolder) {
            // 返回步骤对应的截图路径
            const basePath = '资料/case数据上传过程-20251127-CXF/3-数据上传步骤/';
            const imageMap = {
                '01 注册 登入': [
                    basePath + '01 注册 登入/截屏2025-11-26 16.00.25.jpg',
                    basePath + '01 注册 登入/截屏2025-11-26 16.04.10.jpg',
                    basePath + '01 注册 登入/截屏2025-11-26 16.07.13.jpg',
                    basePath + '01 注册 登入/截屏2025-11-26 16.15.47.jpg'
                ],
                '02 BioSample': [
                    basePath + '02 BioSample/截屏2025-11-26 16.19.18.jpg',
                    basePath + '02 BioSample/截屏2025-11-26 16.23.13.jpg',
                    basePath + '02 BioSample/截屏2025-11-26 16.25.53.jpg',
                    basePath + '02 BioSample/截屏2025-11-26 16.35.48.jpg',
                    basePath + '02 BioSample/截屏2025-11-26 17.20.56.jpg',
                    basePath + '02 BioSample/截屏2025-11-26 17.21.46.jpg',
                    basePath + '02 BioSample/截屏2025-11-26 17.21.56.jpg',
                    basePath + '02 BioSample/截屏2025-11-26 17.21.59.jpg',
                    basePath + '02 BioSample/截屏2025-11-26 17.22.01.jpg',
                    basePath + '02 BioSample/截屏2025-11-26 17.22.02.jpg',
                    basePath + '02 BioSample/截屏2025-11-26 17.22.03.jpg'
                ],
                '03 BioProject': [
                    basePath + '03 BioProject/截屏2025-11-26 14.49.56.jpg',
                    basePath + '03 BioProject/截屏2025-11-26 14.51.37.jpg',
                    basePath + '03 BioProject/截屏2025-11-26 14.54.40.jpg',
                    basePath + '03 BioProject/截屏2025-11-26 17.39.17.jpg',
                    basePath + '03 BioProject/截屏2025-11-27 09.12.26.jpg',
                    basePath + '03 BioProject/截屏2025-11-27 09.12.44.jpg',
                    basePath + '03 BioProject/截屏2025-11-27 09.30.57.jpg'
                ],
                '04 SRA': [
                    basePath + '04 SRA/截屏2025-11-26 14.49.56.jpg',
                    basePath + '04 SRA/截屏2025-11-27 09.37.10.jpg',
                    basePath + '04 SRA/截屏2025-11-27 09.38.02.jpg',
                    basePath + '04 SRA/截屏2025-11-27 09.39.48.jpg',
                    basePath + '04 SRA/截屏2025-11-27 09.44.34.jpg',
                    basePath + '04 SRA/截屏2025-11-27 09.45.39.jpg',
                    basePath + '04 SRA/截屏2025-11-27 10.07.32.jpg',
                    basePath + '04 SRA/截屏2025-11-27 10.11.38.jpg',
                    basePath + '04 SRA/截屏2025-11-27 10.12.48.jpg',
                    basePath + '04 SRA/截屏2025-11-27 10.14.11.jpg'
                ]
            };
            return imageMap[stepFolder] || [];
        },
        saveUploadStatus() {
            this.autoSave();
        },
        saveUploadData() {
            this.autoSave();
        },
        syncUploadToContent() {
            const idx = this.careSections.findIndex(s => s.title.startsWith('15.') && s.isSpecialSection);
            if (idx >= 0) {
                let content = '数据上传状态：\n';
                content += `- BioSample ID：${this.uploadData.bioSampleId || '未填写'}\n`;
                content += `- BioProject ID：${this.uploadData.bioProjectId || '未填写'}\n`;
                content += `- SRA Accession：${this.uploadData.sraAccession || '未填写'}\n`;
                content += `- 上传日期：${this.uploadData.uploadDate || '未填写'}\n`;
                content += `- 备注：\n`;
                this.careSections[idx].content = content;
                this.autoSave();
            }
        }
    }
}).mount('#app');

