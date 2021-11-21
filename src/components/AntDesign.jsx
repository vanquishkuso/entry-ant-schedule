import React, { useState } from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { ConfigProvider, DatePicker, Space } from "antd";
import svSE from "antd/lib/locale/sv_SE";
import "moment/locale/sv";
import "./styles.css";

const AntDesign = () => {
  moment.locale("se");

  const [price, setPrice] = useState();
  const disabledDates2 = [
    { time: "2021-12-30", occasions: 50, price: "500" },
    { time: "2021-12-26", occasions: 50, price: "300" },
    { time: "2021-12-27", occasions: 0, price: "900" },
    { time: "2021-12-29", occasions: 5, price: "800" },
    { time: "2021-12-28", occasions: 50, price: "700" },
    { time: "2022-01-15", occasions: 50, price: "600" },
  ];

  // const lowAvailability = "2021-11-26";
  // const fullAvailability = "2021-11-28";

  const disabledDate = (current) => {
    return (
      (current && current < moment().endOf("day")) ||
      !disabledDates2.find(
        (date) => date.time === moment(current).format("YYYY-MM-DD")
      )
    );
  };

  // const checkDate = (date) => {
  //   if (moment(lowAvailability).format("YYYY-MM-DD") === date) {
  //     return "low";
  //   }
  //   if (moment(fullAvailability).format("YYYY-MM-DD") === date) {
  //     return "full";
  //   }
  // };

  const checkDate2 = (date) => {
    const filter = disabledDates2.filter(
      (el) => moment(el.time).format("YYYY-MM-DD") === date
    );

    if (filter[0] !== undefined) {
      if (Object.values(filter[0])[1] >= 10) {
        return ["available", Object.values(filter[0])[2]];
      }

      if (Object.values(filter[0])[1] > 0 && Object.values(filter[0])[1] < 10) {
        return ["low", Object.values(filter[0])[2]];
      }
      if (Object.values(filter[0])[1] === 0) {
        return ["full", Object.values(filter[0])[2]];
      }
    }
  };

  // if (Object.values(filter[0])[1] === 0) {
  //   return "full";
  // }

  const onChange = (date, dateString) => {
    console.log(moment(dateString).format("YYYY-MM-DD"));

  };

  function getSafe(fn, defaultVal) {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  }
  let full;
  let cost;
  // Object.values(filter[0])[2],
  return (
    <div id="hi">
      <ConfigProvider locale={svSE}>
        <div className="hi2">
          <DatePicker
            onChange={onChange}
            format="YYYY-MM-DD"
            defaultValue={moment(disabledDates2[0].time)}
            disabledDate={disabledDate}
            open="true"
            dateRender={(current) => {
              {
              }
              const style = {};
              if (
                getSafe(
                  () => checkDate2(moment(current).format("YYYY-MM-DD"))[0]
                ) === "available"
              ) {
                style.backgroundColor = "#8bc944";
                style.borderRadius = "10px";
                style.padding = "0.5em 1em 0em 1em";
                style.color = "#2c2c2c";
              }

              if (
                getSafe(
                  () => checkDate2(moment(current).format("YYYY-MM-DD"))[0]
                ) === "low"
              ) {
                style.backgroundColor = "#d8ca4c";
                style.borderRadius = "10px";
                style.padding = "0.5em 1em 0em 1em";
                style.color = "#2c2c2c";
              }

              if (
                getSafe(
                  () => checkDate2(moment(current).format("YYYY-MM-DD"))[0]
                ) === "full"
              ) {
                style.backgroundColor = "#ff6d59";
                style.borderRadius = "10px";
                style.opacity = "0.4";
                style.padding = "0.5em 1em 0em 1em";
                style.color = "#2c2c2c";

              }
              {
                cost = getSafe(
                  () => checkDate2(moment(current).format("YYYY-MM-DD"))[1]
                );
                full = getSafe(
                  () => checkDate2(moment(current).format("YYYY-MM-DD"))[0]
                );
              }
              return (
                <div className={`ant-picker-cell-inner`} style={style}>
                  
                  <div>{current.date()}</div>
                  {cost !== undefined ? (
                    <p
                      style={{
                        fontWeight: "400",
                        fontSize: "0.7em",
                        padding: "-0.5em",
                      }}
                    >
                      Fr&nbsp;
                      {cost}
                      &nbsp;kr
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              );
            }}
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default AntDesign;
