import { View } from "@tarojs/components";
import "./index.less";

export default function DavWaterFall({ className, list, onClick }) {
  const containerClass = `dav-water-fall ${className || ""}`;

  return (
    <>
      <View className={containerClass}>
        {list.map((column, index) => {
          return (
            <View className="water-fall-column" key={index}>
              {column.map((item, i) => {
                return (
                  <View className="water-fall-item" key={i} onClick={() => onClick(item)}>
                    {item.dom}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </>
  );
}
