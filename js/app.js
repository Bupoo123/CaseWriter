const { createApp } = Vue;

createApp({
    data() {
        return {
            currentView: 'writing',
            activeSection: null,
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
            loadingTemplates: false,
            selectedMultiFileItem: null,
            releaseInfo: {
                version: '1.0',
                downloadBaseUrl: 'https://github.com/Bupoo123/CaseWriter/releases/download/v1.0'
            },
            careSections: [
                {
                    title: '1. 标题', enTitle: 'Title',
                    description: '标题应简洁明了，能准确反映病例的核心内容，通常包含病例类型和主要发现。',
                    content: '',
                    placeholder: '例如：一例罕见病原体感染的病例报告',
                    tips: [
                        '标题应简洁，通常不超过15个词',
                        '避免使用缩写词（除非是广泛认知的）',
                        '可以包含病例类型（如：罕见、复杂、新发等）',
                        '标题结构模式：[病例类型 / 病原名 / 部位] + 动词短语（diagnosed / identified / assisted by） + mNGS',
                        '常见句型示例：',
                        '  • "A case of X diagnosed by mNGS" - 例如：A case of Fitz-Hugh–Curtis syndrome diagnosed by mNGS',
                        '  • "mNGS assists the diagnosis of X infection" - 例如：mNGS assists diagnosis of central nervous system infection',
                        '  • "Metagenomic next-generation sequencing identifies Y" - 例如：mNGS identifies rare bacterial infection',
                        '高频关键词：case report, metagenomic next-generation sequencing, diagnosed by, identified using, infection, encephalitis, meningitis, empyema, rare pathogen'
                    ]
                },
                {
                    title: '2. 关键词', enTitle: 'Keywords',
                    description: '提供3-10个关键词，便于检索和索引。',
                    content: '',
                    placeholder: '例如：病例报告、罕见感染、mNGS、病原检测',
                    tips: [
                        '使用MeSH术语（如果可能）',
                        '关键词应涵盖病例的主要方面',
                        '避免过于宽泛的术语'
                    ]
                },
                {
                    title: '3. 摘要', enTitle: 'Abstract',
                    description: '提供结构式摘要，包括背景、病例介绍、结论和教学要点。',
                    content: '',
                    placeholder: '背景：\n病例介绍：\n结论：\n教学要点：',
                    tips: [
                        '摘要应独立成文，无需阅读全文即可理解',
                        '通常150-250词',
                        '突出病例的独特性和教学价值'
                    ]
                },
                {
                    title: '4. 引言', enTitle: 'Introduction',
                    description: '介绍背景信息，说明为什么这个病例值得报告。',
                    content: '',
                    placeholder: '介绍相关疾病的背景、流行病学、诊断挑战等...',
                    tips: [
                        '简要介绍相关疾病的背景知识',
                        '说明病例的独特性和报告价值',
                        '引用相关文献支持',
                        '通常1-2段即可'
                    ]
                },
                {
                    title: '5. 患者信息', enTitle: 'Patient information',
                    description: '描述患者的基本信息、主诉、现病史、既往史等。',
                    content: '',
                    placeholder: '患者基本信息：\n主诉：\n现病史：\n既往史：\n家族史：\n社会史：',
                    tips: [
                        '保护患者隐私，避免可识别信息',
                        '按时间顺序描述病史',
                        '包括相关的生活方式、职业、旅行史等',
                        '使用匿名化处理（如：患者，男性，45岁）'
                    ]
                },
                {
                    title: '6. 临床发现', enTitle: 'Clinical findings',
                    description: '详细描述体格检查、生命体征、临床表现等。',
                    content: '',
                    placeholder: '体格检查：\n生命体征：\n临床表现：\n病程进展：',
                    tips: [
                        '系统性地描述临床发现',
                        '使用客观、准确的医学术语',
                        '记录时间节点和变化',
                        '包括阳性发现和重要的阴性发现'
                    ]
                },
                {
                    title: '7. 时间线', enTitle: 'Timeline',
                    description: '按时间顺序列出重要事件、检查、诊断和治疗。',
                    content: '',
                    placeholder: '时间线：\n- 日期1：事件描述\n- 日期2：事件描述\n...',
                    tips: [
                        '使用表格或列表形式',
                        '清晰标注日期和时间',
                        '包括所有关键事件'
                    ]
                },
                {
                    title: '8. 诊断评估', enTitle: 'Diagnostic assessment',
                    description: '描述诊断过程、实验室检查、影像学检查、病理检查等。',
                    content: '',
                    placeholder: '实验室检查：\n影像学检查：\n病理检查：\n其他检查：\n诊断依据：',
                    tips: [
                        '详细描述所有相关检查',
                        '包括检查方法、结果和参考值',
                        '说明检查的临床意义',
                        '可以附上关键检查结果'
                    ]
                },
                {
                    title: '9. 治疗干预', enTitle: 'Therapeutic interventions',
                    description: '描述治疗方案、药物剂量、治疗过程、不良反应等。',
                    content: '',
                    placeholder: '治疗方案：\n药物剂量：\n治疗过程：\n不良反应：\n治疗调整：',
                    tips: [
                        '详细描述治疗方案',
                        '包括药物名称、剂量、给药途径、频率',
                        '记录治疗反应和调整',
                        '说明治疗依据'
                    ]
                },
                {
                    title: '10. 随访和结果', enTitle: 'Follow-up and outcomes',
                    description: '描述患者随访情况、治疗效果、预后等。',
                    content: '',
                    placeholder: '随访时间：\n随访结果：\n治疗效果：\n预后评估：',
                    tips: [
                        '明确随访时间点',
                        '描述患者的恢复情况',
                        '评估治疗效果',
                        '说明长期预后'
                    ]
                },
                {
                    title: '11. 讨论', enTitle: 'Discussion',
                    description: '分析病例特点、诊断难点、治疗经验、文献对比等。',
                    content: '',
                    placeholder: '病例特点分析：\n诊断难点：\n治疗经验：\n文献对比：\n临床意义：',
                    tips: [
                        '深入分析病例的独特之处',
                        '讨论诊断和治疗的挑战',
                        '与相关文献进行对比',
                        '总结临床经验和教训',
                        '通常是最重要的部分'
                    ]
                },
                {
                    title: '12. 患者观点', enTitle: 'Patient perspective',
                    description: '（可选）从患者角度描述疾病经历、感受等。',
                    content: '',
                    placeholder: '患者对疾病的感受：\n治疗过程中的体验：\n对医疗团队的反馈：',
                    tips: [
                        '这部分是可选的',
                        '如果包含，应真实反映患者观点',
                        '可以增强病例报告的人文关怀'
                    ]
                },
                {
                    title: '13. 知情同意', enTitle: 'Informed consent',
                    description: '说明已获得患者知情同意，符合伦理要求。',
                    content: '',
                    placeholder: '已获得患者/家属的书面知情同意。本研究符合伦理要求。',
                    tips: [
                        '必须获得患者知情同意',
                        '说明伦理审查情况（如适用）',
                        '保护患者隐私'
                    ]
                },
                {
                    title: '14. 参考文献（可选）', enTitle: 'References (optional)',
                    description: '列出文中引用的参考文献，建议不少于15条，遵循拟投稿期刊格式要求。',
                    content: '',
                    placeholder: '示例：\n[1] Author A, Author B. Title. Journal. Year;Volume(Issue):Pages. DOI',
                    tips: [
                        '建议使用参考文献管理工具（Zotero/EndNote/Mendeley等）',
                        '按期刊要求统一格式（Vancouver/AMA/APA等）',
                        '文内引用与参考文献列表保持一致'
                    ]
                }
            ],
            // 时间线编辑器数据
            timelineEvents: [],
            timelineForm: { date: '', event: '', note: '' },
            writingGuides: [
                {
                    title: 'CARE 指南核心原则',
                    type: 'text',
                    content: [
                        'CARE（Case Report）指南是国际公认的病例报告撰写标准，旨在提高病例报告的质量和一致性。',
                        '遵循CARE指南可以确保病例报告包含所有必要信息，便于读者理解和学习。',
                        '每个部分都有其特定的目的和要求，应认真填写，避免遗漏重要信息。'
                    ]
                },
                {
                    title: '图表绘制指导（Figures & Tables）',
                    type: 'tips',
                    content: [
                        '可考虑插图类型：影像学（X-ray/CT/MRI）、mNGS结果（reads/覆盖度/物种图）、细胞学图、病理学切片、培养/药敏结果截图',
                        '病程时间线：展示关键时间点（起病、入院、检验、mNGS出报告、治疗调整、随访）',
                        '三线表：多患者临床信息表/文献汇总表（表头、表体、表底三条线，统一字体与对齐）',
                        '注意事项：去标识化保护隐私；图片分辨率≥300 dpi；统一配色与字体；遵循期刊图片尺寸与格式（常见：TIFF/JPEG/PDF）',
                        '模板与示例：后续将提供空白时间线模板与经典病例病程图示例'
                    ]
                },
                {
                    title: '参考文献与引用管理',
                    type: 'tips',
                    content: [
                        '引言与讨论部分通常建议≥15条参考文献，确保时效性与相关性',
                        '遵循拟投稿期刊格式（Vancouver/AMA/APA等），统一标点与缩写',
                        '推荐工具：Zotero、EndNote、Mendeley、BibTeX；建议配合Word/LaTeX插件实现快速插引'
                    ]
                },
                {
                    title: '常见写作错误',
                    type: 'tips',
                    content: [
                        '标题过于宽泛或不够具体',
                        '摘要缺少关键信息或结构不清晰',
                        '患者信息不够详细或包含可识别信息',
                        '临床发现描述不系统、不客观',
                        '时间线不清晰或遗漏关键事件',
                        '诊断评估缺少必要的检查结果',
                        '治疗干预描述不够详细',
                        '随访信息不完整',
                        '讨论部分过于简单，缺少深度分析',
                        '缺少知情同意说明'
                    ]
                },
                {
                    title: '写作技巧',
                    type: 'tips',
                    content: [
                        '使用清晰、简洁的学术语言',
                        '避免使用缩写词（除非首次出现时已定义）',
                        '使用客观描述，避免主观判断',
                        '按时间顺序组织内容',
                        '引用相关文献支持观点',
                        '突出病例的独特性和教学价值',
                        '保持各部分之间的逻辑连贯性',
                        '仔细校对，确保无语法和拼写错误'
                    ]
                },
                {
                    title: '摘要写作示例',
                    type: 'example',
                    content: `背景：罕见病原体感染在临床诊断中具有挑战性，特别是当常规检测方法无法识别时。

病例介绍：本文报告一例45岁男性患者，因发热、咳嗽就诊。常规培养阴性，通过宏基因组测序（mNGS）检测到罕见病原体X。患者接受针对性治疗后痊愈。

结论：mNGS技术在罕见病原体检测中具有重要价值，可作为常规检测方法的补充。

教学要点：临床医生应认识到罕见病原体感染的可能性，在常规检测阴性时考虑使用mNGS等新技术。`
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
        filteredTemplates() {
            if (!this.templatesData) return [];
            
            let allItems = [
                ...(this.templatesData.checklists || []),
                ...(this.templatesData.guidelines || []),
                ...(this.templatesData.publishedCases || []),
                ...(this.templatesData.classicCases || [])
            ];
            
            // 分类筛选
            if (this.templateCategoryFilter) {
                allItems = allItems.filter(item => item.category === this.templateCategoryFilter);
            }
            
            // 关键词搜索
            if (this.templateFilter) {
                const filter = this.templateFilter.toLowerCase();
                allItems = allItems.filter(item => 
                    item.name.toLowerCase().includes(filter) ||
                    (item.description && item.description.toLowerCase().includes(filter)) ||
                    (item.journal && item.journal.toLowerCase().includes(filter)) ||
                    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(filter)))
                );
            }
            
            return allItems;
        }
    },
    mounted() {
        // 默认新建空病例（不自动加载旧数据）
        this.newCase();
        // 加载模板库数据
        this.loadTemplates();
    },
    methods: {
        autoSave() {
            // 自动保存到本地存储
            const data = {
                careSections: this.careSections,
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
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    if (data.careSections) {
                        // 合并保存的数据
                        data.careSections.forEach((savedSection, index) => {
                            if (this.careSections[index]) {
                                this.careSections[index].content = savedSection.content || '';
                            }
                        });
                    }
                } catch (e) {
                    console.error('加载数据失败:', e);
                }
            }
        },
        loadFromLocal() {
            const saved = localStorage.getItem('casewriter_data');
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    if (data.careSections) {
                        // 合并保存的数据
                        data.careSections.forEach((savedSection, index) => {
                            if (this.careSections[index]) {
                                this.careSections[index].content = savedSection.content || '';
                            }
                        });
                    }
                    alert('数据已从本地存储加载！');
                } catch (e) {
                    console.error('加载数据失败:', e);
                    alert('加载数据失败，请检查数据格式。');
                }
            } else {
                alert('未找到保存的数据。');
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
            const fileName = filePath.split('/').pop();
            // 构建GitHub Releases下载URL
            return `${this.releaseInfo.downloadBaseUrl}/${encodeURIComponent(fileName)}`;
        },
        getFileDownloadUrl(filePath) {
            // 多文件下载
            const fileName = filePath.split('/').pop();
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
            this.careSections = this.careSections.map(sec => ({ ...sec, content: '' }));
            this.timelineEvents = [];
            this.timelineForm = { date: '', event: '', note: '' };
            this.activeSection = 0;
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
        }
    }
}).mount('#app');

