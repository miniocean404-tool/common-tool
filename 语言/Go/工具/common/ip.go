package common

import (
	"net"
	"strings"
)

func GetMainIP() string {
	var mainIp = ""
	var otherIp = ""
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return ""
	}

	for _, addr := range addrs {
		var ip net.IP
		switch v := addr.(type) {
		case *net.IPNet:
			ip = v.IP
		case *net.IPAddr:
			ip = v.IP
		}

		if ip == nil || ip.IsLoopback() {
			continue
		}

		ip = ip.To4()
		if ip != nil && !strings.HasPrefix(ip.String(), "169") && !strings.HasSuffix(ip.String(), ".1") {
			if strings.HasPrefix(ip.String(), "192") {
				mainIp = ip.String()
			} else {
				otherIp = ip.String()
			}
		}
	}

	if mainIp != "" {
		return mainIp
	}
	return otherIp
}
