const fsMessage = ({ wechatPart, branchName, hash, machine, msg }) => {
	return {
		msg_type: 'interactive',
		card: {
			config: {
				wide_screen_mode: true,
			},
			elements: [
				{
					tag: 'img',
					img_key: 'img_v2_a451f189-9c96-404c-b834-505e71d6e00g',
					alt: {
						tag: 'plain_text',
						content: '',
					},
					mode: 'fit_horizontal',
					preview: true,
					compact_width: false,
				},
				{
					tag: 'div',
					text: {
						content: `\n${wechatPart}  👏 👏 👏`,
						tag: 'lark_md',
					},
				},
				{
					tag: 'column_set',
					flex_mode: 'none',
					background_style: 'default',
					columns: [
						{
							tag: 'column',
							width: 'weighted',
							weight: 1,
							vertical_align: 'top',
							elements: [
								{
									tag: 'column_set',
									flex_mode: 'none',
									background_style: 'grey',
									columns: [
										{
											tag: 'column',
											width: 'weighted',
											weight: 1,
											vertical_align: 'top',
											elements: [
												{
													tag: 'markdown',
													content: `**当前分支\n<font color='green'> ${branchName} </font>**`,
													text_align: 'center',
												},
											],
										},
									],
								},
							],
						},
						{
							tag: 'column',
							width: 'weighted',
							weight: 1,
							vertical_align: 'top',
							elements: [
								{
									tag: 'column_set',
									flex_mode: 'none',
									background_style: 'grey',
									columns: [
										{
											tag: 'column',
											width: 'weighted',
											weight: 1,
											vertical_align: 'top',
											elements: [
												{
													tag: 'markdown',
													content: `**hash\n<font color='green'> ${hash} </font>**`,
													text_align: 'center',
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					tag: 'div',
					text: {
						content: `**💪 提交日志**\n📝 ${msg}`,
						tag: 'lark_md',
					},
				},
				{
					tag: 'note',
					elements: [
						{
							tag: 'plain_text',
							content: `💡 ${machine}`,
						},
					],
				},
			],
			header: {
				template: 'turquoise',
				title: {
					content: '📚 您的新的小程序二维码来啦',
					tag: 'plain_text',
				},
			},
		},
	}
}

exports.fsMessage = fsMessage
