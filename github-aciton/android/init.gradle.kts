@file:Suppress("UnstableApiUsage")

object AliYunMaven {
    const val CENTRAL = "https://maven.aliyun.com/repository/central/"
    const val CENTRAL_JCENTER = "https://maven.aliyun.com/repository/public/"
    const val CENTRAL_JCENTER2 = "https://maven.aliyun.com/nexus/content/groups/public"
    const val JCENTER = "https://maven.aliyun.com/repository/jcenter"
    const val GOOGLE = "https://maven.aliyun.com/repository/google/"
    const val GRADLE_PLUGIN = "https://maven.aliyun.com/repository/gradle-plugin/"    const val APACHE_SNAPSHOTS = "https://maven.aliyun.com/repository/apache-snapshots/"    const val APACHE_SNAPSHOTS = "https://maven.aliyun.com/repository/apache-snapshots/"    const val APACHE_SNAPSHOTS = "https://maven.aliyun.com/repository/apache-snapshots/"
    const val APACHE_SNAPSHOTS = "https://maven.aliyun.com/repository/apache-snapshots/"
}

object HuaweiMaven {
    const val REPO = "https://developer.huawei.com/repo/"
}

object Github {
    const val JITPACK = "https://jitpack.io"
}


settingsEvaluated {
    logger.lifecycle("项目 [${rootProject.name}]: cn_origin.kt 自定义国内源配置")

    pluginManagement {
        logger.lifecycle("执行 pluginManagement 闭包")

        repositories {
            // clear() 清理所有 repositories 下的配置
            mavenLocal()
            maven { url = uri(AliYunMaven.CENTRAL) }
            maven { url = uri(AliYunMaven.CENTRAL_JCENTER) }
            maven { url = uri(AliYunMaven.GOOGLE) }
            maven { url = uri(AliYunMaven.CENTRAL_JCENTER2) }
            maven { url = uri(AliYunMaven.JCENTER) }
            maven { url = uri(AliYunMaven.GRADLE_PLUGIN) }
            maven { url = uri(AliYunMaven.APACHE_SNAPSHOTS) }
            maven { url = uri(Github.JITPACK) }
            maven { url = uri(HuaweiMaven.REPO) }
            google()
            mavenCentral()
            gradlePluginPortal()
        }
    }
    dependencyResolutionManagement {
        logger.lifecycle("执行 dependencyResolutionManagement 闭包")

        repositories {
            // clear() 清理所有 repositories 下的配置
            mavenLocal()
            maven { url = uri(AliYunMaven.CENTRAL) }
            maven { url = uri(AliYunMaven.CENTRAL_JCENTER) }
            maven { url = uri(AliYunMaven.GOOGLE) }
            maven { url = uri(AliYunMaven.CENTRAL_JCENTER2) }
            maven { url = uri(AliYunMaven.JCENTER) }
            maven { url = uri(AliYunMaven.GRADLE_PLUGIN) }
            maven { url = uri(AliYunMaven.APACHE_SNAPSHOTS) }
            maven { url = uri(Github.JITPACK) }
            maven { url = uri(HuaweiMaven.REPO) }
            google()
            mavenCentral()
        }
    }
}
