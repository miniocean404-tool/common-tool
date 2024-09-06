import pandas as pd
import matplotlib.pyplot as plt

def process_excel(input_file, output_file):
    # 读取Excel文件
    df = pd.read_excel(input_file)

    # 数据处理
    df['Total'] = df['Quantity'] * df['Price']
    summary = df.groupby('Category')['Total'].sum().sort_values(descending=True)

    # 生成图表
    plt.figure(figsize=(10, 6))
    summary.plot(kind='bar')
    plt.title('Sales by Category')
    plt.xlabel('Category')
    plt.ylabel('Total Sales')
    plt.tight_layout()
    plt.savefig('sales_chart.png')

    # 写入新的Excel文件
    with pd.ExcelWriter(output_file) as writer:
        df.to_excel(writer, sheet_name='Raw Data', index=False)
        summary.to_excel(writer, sheet_name='Summary')

process_excel('sales_data.xlsx', 'sales_report.xlsx')
