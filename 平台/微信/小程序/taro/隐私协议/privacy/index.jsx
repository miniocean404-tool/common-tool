import { Button, Text, View } from "@tarojs/components";
import styles from "./index.module.scss";
import { useMount } from "ahooks";
import React, { useEffect, useState } from "react";

const Privacy = ({ className, onOk, onCancel, desc, title, leftBtnText, rightBtnText }) => {
  const containerClass = `${styles["privacy"]} ${className || ""}`;
  const [descArr, setDescArr] = useState([]);

  useMount(() => {
    onOk({ event: "exposureAuthorization" });
  });

  useEffect(() => {
    const regexp = new RegExp(`(?<start>[^%]+)?(?<rule>%%(?<type>webview|tel):(?<colorFont>[^%].*?):(?<params>.*?)%%)?(?<end>[^%]+)`, "igms");

    const matches = [];
    let match;

    while ((match = regexp.exec(desc))) {
      matches.push(match.groups);
    }

    setDescArr(matches);
  }, [desc]);

  const onCancelFn = (e) => {
    onOk({ event: "disagree" });
    onCancel();
  };

  const onAgree = () => {
    onOk({ event: "agree", buttonId: "agree" });
    onCancel();
  };

  const goWebview = (params) => {
    if (params === "openPrivacyContract") return wx.openPrivacyContract();
  };

  return (
    <View className={containerClass}>
      <View className={styles.bg} catchMove onTouchMove={(e) => e.preventDefault()}></View>

      <View className={styles.container}>
        <View className={styles.title}>{title}</View>

        <View className={styles.desc}>
          {descArr.map((group) => {
            return (
              <>
                <Text>{group.start}</Text>
                {group.type === "webview" && (
                  <Text className={styles.webview} onClick={() => goWebview(group.params)}>
                    {group.colorFont}
                  </Text>
                )}
                <Text>{group.end}</Text>
              </>
            );
          })}
        </View>

        <View className={styles.btnGroup}>
          <Button className={styles.cancel} onClick={onCancelFn}>
            {leftBtnText}
          </Button>

          <Button className={styles.ok} id="agree" openType="agreePrivacyAuthorization" onAgreePrivacyAuthorization={onAgree}>
            {rightBtnText}
          </Button>
        </View>
      </View>
    </View>
  );
};

Privacy.defaultProps = {
  className: "",
  title: "",
  desc: "",
  leftBtnText: "拒绝",
  rightBtnText: "同意",
};

export default Privacy;
