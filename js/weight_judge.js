//
    var bmi; //bmi=#{表示日のbmi}
    var low,range; //low=#{適正下限bmi},range=#{適正bmiの幅}
    var high=low+range; // high=#{適正上限bmi}
    var center=(low+high)/2;//中央値
    var lineh=center+range/5;//超適正上限
    var linel=center-range/5;//超適正下限
    //→ここらへんはAPIから値を変数に代入

//
    var sum_pre; //7日前のBMI
    var sum_to; //今日のBMI

    function judge2(sum_pre,sum_to){ //個別で注意させたい危険を判断する関数
      if(|sum_to-sum_pre|>2.0){
        return "ここ7日間でかなりBMIが変動しています、規則正しい食生活を心がけましょう";
      }
    }
//
    var final_moon; // 最終月経日
    var today; //本日
    var dif; //本日が最終月経日から何日目

    function week_day(dif){ //最終月経日から数えて何週目の何日目か？
      var week=dif/7;　//本日の当たる週
      var day=dif%7; //本日の当たる日
      return week,day;
    }

//
    var final_moon; // 最終月経日
    var today; //本日
    var dif; //本日が最終月経日から何日目
    var week=dif/7;　//本日の当たる週
    var day=dif%7; //本日の当たる日
    var clebration_day; //出産日は最終月経日から10月10日後とする

    function order_three(week,day){//期にしたがって判定命令する関数
      if(0<=week<=3){ //妊娠超初期の命令(一般人と同じ段階：19~25適正固定)

      }

      else if(4<=week<=15){ //妊娠初期の命令
        return judge(bmi,low,high,center,linel,lineh);
      }

      else if(16=week<=27){ //妊娠中期の命令
        return judge(bmi,low,high,center,linel,lineh);
      }

      else if(28<=week<=39){ //妊娠後期の命令
        return judge(bmi,low,high,center,linel,lineh);
      }

      else if(40<=week<=60){ //妊娠余剰期の処理
        if(today==clebration_day){
          return "本日が出産予定日です！おめでとうございます！"；
          break;
        }
        else {
          return judge(bmi,low,high,center,linel,lineh);
        }
      }
    }

//　　
