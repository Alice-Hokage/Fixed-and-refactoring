import createStatementData from './createStateData.js';
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}
function renderPlainText(data, plays) {
    let result = `Счет для ${data.customer}\n`;
  for (let perf of data.performances) {
      result += ` ${perf.play.name}: `;
      result += `${rub(perf.amount)} (${perf.audience} мест)\n `;
  }

  result += `Итого с вас ${rub(data.allAmount)}\n`;
  result += `Вы заработали ${data.totalVolumeCredits} бонусов\n`;
    return result;
    
    function htmlStatement(invoice, plays) {
      return renderHtml(createStatementData(invoice, plays));
      }
      function renderHtml(data) {
      let result = `<hl>Statement for ${data.customer}</hl>\n`;
      result += "<table>\n";
      result += "<trxth>play</thxth>seats</thxth>cost</thx/tr>";
      for (let perf of data.performances) {
        result += ` <trxtd>${perf .play.name}</td>`;
        result += `<td>${perf.audience}</td>`;
        result += `<td>${usd(perf .amount) }</tdx/tr>\n`;
      }
      result += "</table>\n";
      result += `<p>Amount owed is <em>`;
      result += `${usd(data.allAmountAmount)}</em></p>\n`;
      result += `<p>You earned <em>${data.totalVolumeCredits}`;
      result += `</em> credits</p>\n`;
      return result;
    }
}
