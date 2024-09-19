/**
 * @file 特定商取引法に基づく表記ページ
 * @description このページは、特定商取引法に基づく表記を表示します。
 * @path /law
 * @example <LegalInformationPage />
 */

const LegalInformationPage: React.FC = () => {
	return (
		<>
			<div className="container mx-auto px-4 py-8 prose max-w-screen-lg">
				<h1 className="text-3xl font-bold mb-6">特定商取引法に基づく表記</h1>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">本サイト運営会社</h2>
					<p>名称：Forwidg株式会社</p>
					<p>運営統括責任者：千葉 工</p>
					<p>本店所在地：〒362-0809 埼玉県北足立郡伊奈町中央3−141</p>
					<p>お問合せ窓口：info@fores-tone.co.jp</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">サービス費用</h2>
					<p>各サービスの申込みページに記載</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">支払い方法</h2>
					<p>クレジットカード決済</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">支払い時期</h2>
					<p>
						クレジットカード決済：サービス提供後、登録したクレジットカードにより自動的に決済されます。
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">サービス提供の時期</h2>
					<p>
						お客様がサブスクリプションを購入後、即時にサービスが利用可能となります。
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">キャンセルポリシー</h2>
					<p>
						サブスクリプションのキャンセルは、お客様のアカウントページから随時可能です。
					</p>
					<p>
						キャンセル後は、現在の請求期間の終了時までサービスをご利用いただけます。
					</p>
					<p>
						返金は基本行っておりませんが、特別な事情がある場合は対応いたします。
						問い合わせは
						<a href="mailto:info@fores-tone.co.jp">info@fores-tone.co.jp</a>
						まで
					</p>
				</section>
			</div>
		</>
	);
};

export default LegalInformationPage;
