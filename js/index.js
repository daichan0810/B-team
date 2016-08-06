var tokenValue = "IGj9Xm1b1Xw817TL7W7MQFHBSehRh5PlA1XESXuyOvoclflo2IyUaVUyaFTtO7y3kNmQPP779bJln-u2CcmWUV0bTlBNUgMY";
var apiUrl = "https://gnvduf9ntg.execute-api.ap-northeast-1.amazonaws.com/intern/activity/days"

//GETでAPIを叩く関数
$(function(){
  $('button#getData').click(function(){
    // 重複実行防止のためにボタンを押せなくする
    if(isNotEmptyForGet()){
      var button = $(this);
      button.attr("disabled",true);
      $.ajax({
        headers: {
          "X-AccessToken" : tokenValue
        },
        type: "GET",
        dataType: "json",
        url: apiUrl,
        data: {startDate: $('#startDate').val(), endDate: $('#endDate').val()},
        success: function(data){
          console.log("GET Success !");
          var results = data.results;
          if(results.length > 0){
            // グラフ描画用変数
            var graphXCategory = [], graphWSteps = [],graphTCal = [];
            var result = $('#resultTable');
            //結果表示領域を一度リセット
            result.empty();
            //結果表示領域に表示するhtmlの作成
            var table = $("<table>").attr("class","table table-striped").appendTo(result);
            var thead = $("<thead>").appendTo(table);
            var tr = $("<tr>")
            .append("<th>測定日</th>")
            .append("<th>総消費カロリー</th>")
            .append("<th>歩数</th>")
            .append("<th>中強度運動時間</th>")
            .append("<th>入力区分</th>")
            .append("</tr>")
            .append("</thead>")
            .appendTo(thead);
            var tbody = $("<tbody>").appendTo(table);
            for (var i = 0; i < results.length; i++) {
              $("<tr>")
              .append("<td>" + results[i].measurementDate + "</td>")
              .append("<td>" + (results[i].totalUsedCalories || "-- ") + "kcal" + "</td>")
              .append("<td>" + (results[i].walkingSteps || "-- ") + "歩" + "</td>")
              .append("<td>" + (results[i].moderateIntensityExerciseMinutes || "-- ") + "分" + "</td>")
              .append("<td>" + (results[i].inputType) + "</td>")
              .appendTo(tbody);
              graphXCategory.push(results[i].measurementDate);
              graphWSteps.push(results[i].walkingSteps);
              graphTCal.push(results[i].totalUsedCalories);
            }
            drawGraph(graphXCategory,graphWSteps,graphTCal);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
        },
        complete: function(){
          button.attr("disabled",false);
        }
      });
    }
  });
});

// グラフ描画関数（highcharts.js）
function drawGraph(xCategory, wSteps, tCal) {
  $('div#resultGraph').highcharts({
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: '歩数と総消費カロリー'
    },
    xAxis: [{
      categories: xCategory,
      crosshair: true
    }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}kcal',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      title: {
        text: '総消費カロリー',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      }
    }, { // Secondary yAxis
      title: {
        text: '歩数',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      labels: {
        format: '{value} 歩',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 120,
      verticalAlign: 'top',
      y: 100,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
      name: '歩数',
      type: 'column',
      yAxis: 1,
      data: wSteps,
      tooltip: {
        valueSuffix: ' 歩'
      }

    }, {
      name: '総消費カロリー',
      type: 'spline',
      data: tCal,
      tooltip: {
        valueSuffix: ' kcal'
      }
    }]
  });
}

function isNotEmptyForGet(){
  var errMes = "";
  if($('#startDate').val() == "" || $('#endDate').val() == ""){
    errMes += "未入力項目があります。"
    var feedback = $('span#feedbackForGet');
    feedback.empty();
    feedback.append(errMes);
    return false;
  }
  return true;
}
