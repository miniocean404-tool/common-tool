import { useEffect } from "react"

import loading from "./image/loading-icon.svg"
import error from "./image/error-icon.png"
import success from "./image/success-icon.png"

import styles from "./index.module.scss"

const IconList = {
  success,
  error,
  loading,
}

export default function Toast({
  imgUrl,
  title = "",
  desc = "",
  isShow = false,
  isBackground = false,
  type = "",
}) {
  const isLongText = title.length >= 7 || desc.length >= 7
  useEffect(() => {}, [])

  function banScroll(e) {
    e.preventDefault()
  }

  return (
    <>
      <div
        className={`${styles.toastBgBox} ${isBackground && styles.toast_bg}`}
        onTouchMove={banScroll}
        style={{ visibility: isShow ? "" : "hidden" }}
      >
        <div className={styles.toastBox}>
          <img src={IconList[type] || imgUrl} className={styles.icon} />

          <div className={styles.contentBox} style={{ textAlign: isLongText ? "left" : "center" }}>
            <span className={styles.title}>{title}</span>
            {desc && <span className={styles.desc}>{desc}</span>}
          </div>
        </div>
      </div>
    </>
  )
}
