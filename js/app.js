const { createApp } = Vue;

createApp({
    data() {
        return {
            currentView: 'writing',
            activeSection: null,
            journalFilter: '',
            journalTopicFilter: '',
            journalOAFilter: '',
            careSections: [
                {
                    title: '1. 标题',
                    description: '标题应简洁明了，能准确反映病例的核心内容，通常包含病例类型和主要发现。',
                    content: '',
                    placeholder: '例如：一例罕见病原体感染的病例报告',
                    tips: [
                        '标题应简洁，通常不超过15个词',
                        '避免使用缩写词（除非是广泛认知的）',
                        '可以包含病例类型（如：罕见、复杂、新发等）'
                    ]
                },
                {
                    title: '2. 关键词',
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
                    title: '3. 摘要',
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
                    title: '4. 引言',
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
                    title: '5. 患者信息',
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
                    title: '6. 临床发现',
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
                    title: '7. 时间线',
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
                    title: '8. 诊断评估',
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
                    title: '9. 治疗干预',
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
                    title: '10. 随访和结果',
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
                    title: '11. 讨论',
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
                    title: '12. 患者观点',
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
                    title: '13. 知情同意',
                    description: '说明已获得患者知情同意，符合伦理要求。',
                    content: '',
                    placeholder: '已获得患者/家属的书面知情同意。本研究符合伦理要求。',
                    tips: [
                        '必须获得患者知情同意',
                        '说明伦理审查情况（如适用）',
                        '保护患者隐私'
                    ]
                }
            ],
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
                    topic: '综合/多学科',
                    publisher: 'Elsevier',
                    oa: '是',
                    apc: '约$1950',
                    submissionUrl: 'https://www.cell.com/heliyon',
                    templateUrl: 'https://www.cell.com/heliyon/guide-for-authors'
                },
                {
                    topic: '临床微生物/感染病',
                    publisher: 'Elsevier',
                    oa: '否（混合）',
                    apc: '可选OA约$3000',
                    submissionUrl: 'https://www.sciencedirect.com/journal/diagnostic-microbiology-and-infectious-disease',
                    templateUrl: 'https://www.elsevier.com/journals/diagnostic-microbiology-and-infectious-disease'
                },
                {
                    topic: '耐药/感染病',
                    publisher: 'Dove Press',
                    oa: '是',
                    apc: '约$2700',
                    submissionUrl: 'https://www.dovepress.com/infection-and-drug-resistance-journal',
                    templateUrl: 'https://www.dovepress.com/author_guidelines.php?journal_id=56'
                },
                {
                    topic: '感染病',
                    publisher: 'BMC/Springer Nature',
                    oa: '是',
                    apc: '约£2490',
                    submissionUrl: 'https://bmcinfectdis.biomedcentral.com/',
                    templateUrl: 'https://bmcinfectdis.biomedcentral.com/submission-guidelines'
                },
                {
                    topic: '感染病',
                    publisher: 'Elsevier/ISID',
                    oa: '是',
                    apc: '约$3300',
                    submissionUrl: 'https://www.journals.elsevier.com/international-journal-of-infectious-diseases',
                    templateUrl: 'https://www.elsevier.com/journals/international-journal-of-infectious-diseases'
                },
                {
                    topic: '发展中国家感染病',
                    publisher: 'JIDC Foundation',
                    oa: '是',
                    apc: '约€500',
                    submissionUrl: 'https://jidc.org/',
                    templateUrl: 'https://jidc.org/index.php/journal/about/submissions'
                },
                {
                    topic: '新发传染病',
                    publisher: 'CDC (USA)',
                    oa: '否',
                    apc: '免费',
                    submissionUrl: 'https://wwwnc.cdc.gov/eid',
                    templateUrl: 'https://wwwnc.cdc.gov/eid/page/author-guidelines'
                },
                {
                    topic: '感染病病例报告',
                    publisher: 'Elsevier',
                    oa: '是',
                    apc: '约$1130',
                    submissionUrl: 'https://www.sciencedirect.com/journal/idcases',
                    templateUrl: 'https://www.elsevier.com/journals/idcases'
                },
                {
                    topic: '公共卫生',
                    publisher: 'Frontiers',
                    oa: '是',
                    apc: '约$2950',
                    submissionUrl: 'https://www.frontiersin.org/journals/public-health',
                    templateUrl: 'https://www.frontiersin.org/journals/public-health#author-guidelines'
                },
                {
                    topic: '细胞与感染微生物学',
                    publisher: 'Frontiers',
                    oa: '是',
                    apc: '约$2950',
                    submissionUrl: 'https://www.frontiersin.org/journals/cellular-and-infection-microbiology',
                    templateUrl: 'https://www.frontiersin.org/journals/cellular-and-infection-microbiology#author-guidelines'
                },
                {
                    topic: '免疫学',
                    publisher: 'Frontiers',
                    oa: '是',
                    apc: '约$2950',
                    submissionUrl: 'https://www.frontiersin.org/journals/immunology',
                    templateUrl: 'https://www.frontiersin.org/journals/immunology#author-guidelines'
                },
                {
                    topic: '儿科学',
                    publisher: 'Frontiers',
                    oa: '是',
                    apc: '约$2950',
                    submissionUrl: 'https://www.frontiersin.org/journals/pediatrics',
                    templateUrl: 'https://www.frontiersin.org/journals/pediatrics#author-guidelines'
                },
                {
                    topic: '神经学',
                    publisher: 'Frontiers',
                    oa: '是',
                    apc: '约$2950',
                    submissionUrl: 'https://www.frontiersin.org/journals/neurology',
                    templateUrl: 'https://www.frontiersin.org/journals/neurology#author-guidelines'
                },
                {
                    topic: '神经病学',
                    publisher: 'BMC/Springer Nature',
                    oa: '是',
                    apc: '约£2490',
                    submissionUrl: 'https://bmcneurol.biomedcentral.com/',
                    templateUrl: 'https://bmcneurol.biomedcentral.com/submission-guidelines'
                },
                {
                    topic: '呼吸系统疾病',
                    publisher: 'BMC/Springer Nature',
                    oa: '是',
                    apc: '约£2490',
                    submissionUrl: 'https://bmcpulmmed.biomedcentral.com/',
                    templateUrl: 'https://bmcpulmmed.biomedcentral.com/submission-guidelines'
                },
                {
                    topic: '病例报告',
                    publisher: 'BMC/Springer Nature',
                    oa: '是',
                    apc: '约£1060',
                    submissionUrl: 'https://jmedicalcasereports.biomedcentral.com/',
                    templateUrl: 'https://jmedicalcasereports.biomedcentral.com/submission-guidelines'
                },
                {
                    topic: '呼吸病病例报告',
                    publisher: 'Elsevier',
                    oa: '是',
                    apc: '约$600',
                    submissionUrl: 'https://www.sciencedirect.com/journal/respiratory-medicine-case-reports',
                    templateUrl: 'https://www.elsevier.com/journals/respiratory-medicine-case-reports'
                },
                {
                    topic: '眼科学病例报告',
                    publisher: 'Elsevier',
                    oa: '是',
                    apc: '约$750',
                    submissionUrl: 'https://www.sciencedirect.com/journal/american-journal-of-ophthalmology-case-reports',
                    templateUrl: 'https://www.elsevier.com/journals/american-journal-of-ophthalmology-case-reports'
                },
                {
                    topic: '实验室医学',
                    publisher: 'Clin Lab GmbH (Germany)',
                    oa: '否',
                    apc: '免费',
                    submissionUrl: 'https://www.clin-lab-publications.com/',
                    templateUrl: 'https://www.clin-lab-publications.com/instructions.html'
                },
                {
                    topic: '综合/生命科学',
                    publisher: 'De Gruyter',
                    oa: '是',
                    apc: '约€1200',
                    submissionUrl: 'https://www.degruyter.com/journal/key/biolsci/html',
                    templateUrl: 'https://www.degruyter.com/journal/key/biolsci/html#instructions'
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
            
            return filtered;
        }
    },
    mounted() {
        // 从本地存储静默加载数据（不显示提示）
        this.loadFromLocalSilent();
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
                        alert('数据已从本地存储加载！');
                    } else {
                        alert('未找到保存的数据。');
                    }
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
                        html += `    <h1>${section.title}</h1>\n`;
                        
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
                        markdown += `## ${section.title}\n\n`;
                        
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
        }
    }
}).mount('#app');

