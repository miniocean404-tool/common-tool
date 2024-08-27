package tty

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/charmbracelet/bubbles/progress"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

const (
	padding  = 2
	maxWidth = 80
)

var helpStyle = lipgloss.NewStyle().Foreground(lipgloss.Color("#626262")).Render

type ProgressModel struct {
	progress progress.Model
	// 自定义数据
	data []string
}

func StartProgress() {
	m := ProgressModel{
		progress: progress.New(progress.WithDefaultGradient()),
	}

	if _, err := tea.NewProgram(m).Run(); err != nil {
		fmt.Println("出错啦 !", err)
		os.Exit(1)
	}
}

type CustomMessage string

func (m ProgressModel) Init() tea.Cmd {
	return UpdateProgress()
}

func (m ProgressModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		return m, tea.Quit
	case tea.WindowSizeMsg:
		m.progress.Width = msg.Width - padding*2 - 4
		if m.progress.Width > maxWidth {
			m.progress.Width = maxWidth
		}
		return m, nil
	case CustomMessage:
		if m.progress.Percent() == 1.0 {
			return m, tea.Quit
		}

		// cmd := m.progress.IncrPercent(0.25)
		cmd := m.progress.SetPercent(0.25)

		return m, tea.Batch(UpdateProgress(), cmd)
	case progress.FrameMsg:
		progressModel, cmd := m.progress.Update(msg)
		m.progress = progressModel.(progress.Model)
		return m, cmd
	default:
		return m, nil
	}
}

func (m ProgressModel) View() string {
	pad := strings.Repeat(" ", padding)
	return "\n" +
		pad + m.progress.View() + "\n\n" +
		pad + helpStyle("按下任意键退出...")
}

// 每次更新调用的函数，等待多久
func UpdateProgress() tea.Cmd {
	return tea.Tick(time.Millisecond*300, func(t time.Time) tea.Msg {
		return CustomMessage("我是自定义 message")
	})
}
