# MARS Lab Homepage — 유지보수 가이드 (for Claude)

이 폴더는 부경대학교(PKNU) **MARS Lab**(다개체 로보틱스 및 제어시스템 연구실, 박남진 / Nam-Jin Park 교수)의
홈페이지 소스입니다. 다른 세션에서도 이 문서를 읽고 동일한 방식으로 작업을 이어가세요.

## 사이트 개요
- **로컬 경로:** `C:\Users\user\OneDrive\_Lab\mars-lab-homepage`
- **파일 구성:** `index.html`(단일 페이지, 모든 콘텐츠), `styles.css`, `script.js`, `images/`, `videos/`
- **GitHub:** `github.com/PKNU-507/MARS` (remote `origin`, branch `main`)
- **배포:** GitHub Pages 자동 배포 → https://pknu-507.github.io/MARS/ (push 후 약 1~2분 뒤 반영)
- **언어:** 콘텐츠는 한국어. 학술 용어/논문 제목은 영어.

## ⭐ 핵심 워크플로우 — CV 기반 업데이트
- **단일 진실 공급원(source of truth)은 교수님 CV:**
  `C:\Users\user\OneDrive\_Lab\CV_Prof\CV_namjin.tex`
- 교수님이 **CV를 직접 업데이트**한 뒤 "CV 보고 홈페이지 업데이트해줘"라고 요청하면,
  CV(.tex)를 읽고 → `index.html`과 대조 → 차이를 반영하면 됩니다.
- 진행 순서: ① CV와 index.html 비교해 변경점 목록화 → ② 사용자에게 범위 확인(중요/선택 구분) →
  ③ 수정 → ④ 커밋 & push.

### CV 섹션 ↔ 홈페이지 매핑
| CV 섹션 | 홈페이지 위치 (index.html) |
|---|---|
| Publications: Journal under Review | Publications 탭 `#under-review` |
| Publications: Journal (International) | Publications 탭 `#journal` (연도별 `year-heading`) |
| Publications: Conferences | Publications 탭 `#conference` |
| Education / Professional Experience | Professor 섹션 → Career timeline |
| Professional Services (Editor/Reviewer) | Professor 섹션 → Academic Activities |
| Research Experiences (과제/펀딩) | Professor 섹션 → **Research Grants** |
| Patents | Professor 섹션 → **Patents** |

### 표기 규칙 (반드시 지킬 것)
- **Publications**: 저자 범례는 `*` = First author, `†` = Corresponding author.
  교수 본인 이름은 `<strong>N.-J. Park</strong>` 로 굵게. 역할에 따라 `N.-J. Park*` 또는 `N.-J. Park†`.
  ⚠️ 주의: CV(.tex)의 각주 `*`는 **Corresponding Author**를 뜻함(범례가 반대). 홈페이지 규칙으로 변환할 것.
- **⭐ Under Review 저자 표기 범위**: 홈페이지는 **1저자 + 교신저자만** 적는다(중간 공저자 생략, 단 Park가 중간 공저자면 Park는 유지).
  **CV는 전체 저자를 그대로** 유지 — 즉 CV와 홈페이지의 저자 목록은 의도적으로 다르다.
  각 항목 끝에 **제출년도** `, YYYY.` 표기, **최신순 정렬**(오래된 것이 아래). 제목이 두 줄로 넘어가면 한 줄에 맞게 축약 가능(CV는 원제 유지).
- **Patents**: 범례 `*` = Primary inventor. 주발명자는 `<strong class="accent-text">N.-J. Park*</strong>`.
- 새 항목은 **최신순(내림차순)** 으로 배치. 이름 표기는 `N.-J. Park`, `H.-G. Lee` 처럼 이니셜+하이픈 일관 유지.
- 새 섹션을 만들 땐 기존 클래스 재사용: `timeline` / `timeline-item` / `timeline-content glass-panel` /
  `timeline-title` / `timeline-desc` / `small-text timeline-subdesc` / `subsection-title` / `accent-text`.
- 발표 논문을 갱신하면 Publications 섹션의 `Last updated: YYYY. MM. DD.` 도 함께 갱신.

## 🌐 언어 토글 (KO/EN) — 이중 유지보수 규칙
- 우측 상단 네비에 `KO | EN` 토글. 기본 **KO**, `localStorage('mars-lang')`에 저장.
- 방식: **한국어는 HTML에 그대로**(기본값·SEO), **영어는 `</body>` 직전 인라인 `<script>`의 `I18N_EN` 사전**에만 둔다. 대상 요소에는 `data-i18n="키"` 속성이 붙어 있고, JS가 언어에 맞춰 `innerHTML`을 스왑한다.
- ⭐ **한국어 서술 콘텐츠를 추가·수정하면 반드시 EN 사전(`I18N_EN`)도 같이 갱신**할 것. 새 번역 요소는 ① 요소에 `data-i18n="새키"` 추가 ② `I18N_EN`에 `"새키": \`English…\`` 추가 (백틱 문자열, `<strong>` 등 마크업 그대로 포함 가능).
- 교수·News·Publications 섹션은 원래 영어라 토글 대상 아님(번역 불필요).
- EN 표기 규칙: em-dash 금지(교수님 스타일), 학술 영어로 담백하게. Hero 부제는 EN에서 학과명으로 대체(H2 랩명과 중복 방지).

## 📚 Lecture 탭 — 강의자료 배포 (2026-08-22 신설 · 2026-09-02 탭 구조로 개편)
- 네비 `Lecture` → `#lecture` 섹션. **과목별 탭**(`.course-tabs` + `.tab-btn`)으로 나누고,
  각 탭 패널(`.tab-content.course-panel`) 안에 자료 목록(`.material-item`)을 둔다.
  현재 과목 3개, **학년 오름차순**으로 배치: `Linear Algebra`(학부 2) · `Applied Robotics & Design`(학부 4) ·
  `Linear Systems`(대학원).
- ⚠️ 탭 전환 함수 `openTab()`(script.js)은 **`.section-container` 스코프**로 동작한다.
  Publications도 같은 `.tab-btn`/`.tab-content` 클래스를 쓰므로, 스코프를 없애면 한쪽 탭을 누를 때
  다른 쪽 탭 상태가 초기화된다. 이 스코프를 절대 되돌리지 말 것.
- 파일은 `files/` 에 둔다. **파일명에 버전을 붙인다** (`..._v1.pdf`, `..._v2.pdf` — 2026-09-02 변경).
  갱신하면 새 버전으로 올리고 **이전 PDF는 `git rm` 으로 지운다.** `index.html` 의 `href`·`download` 도 함께 바꾼다.
  ※ **강의노트 책만 예외** — `Linear_Systems_on_Graphs.pdf` 고정명이며 책 세션(`_MARS\_Book\CLAUDE.md`)이 직접 배포한다.
- 링크에 `download` 속성을 붙여 클릭 시 브라우저 뷰어가 아니라 바로 저장되게 한다.
- ⭐ **자료를 갱신할 때마다 반드시 같이 고칠 두 곳:**
  1. `.material-meta` — `Version <v> (draft) · updated YYYY. MM. DD. · <N> pp · <size> MB`
  2. 섹션 헤더의 `Last updated: YYYY. MM. DD.`
- 강의노트 책의 버전 단일 출처는 책 쪽 `main.tex` 의 `\bookversion` / `\bookdate` 이다
  (`선형시스템 (대학원)\LectureNotes\AGENT_BRIEF.md` §1.5의 루틴). **사이트 표기와 표지 표기가 달라지면 안 된다.**
- 새 과목 추가는 ① `.course-tabs` 에 `<button class="tab-btn" onclick="openTab(event, 'course-xxx')">` 추가
  ② `<div id="course-xxx" class="tab-content course-panel glass-panel" style="display:none;">` 패널 복제
  ③ `data-i18n` 키를 새로 만들어 `I18N_EN` 에도 영어를 추가한다.
- 강의자료 원본은 `C:\Users\user\OneDrive\__강의\2학기\<과목폴더>\` 에 있다
  (`선형대수학` · `선형시스템 (대학원)` · `응용로봇공학및설계`). 여기서 `files/` 로 복사해 쓴다.

### ⭐ 강의자료 배포 루틴 (2026-09-02 확립)

과목별로 **별도 세션**이 자료를 만들고, **이 세션이 배포**한다. 접점은 학기 폴더의
**`C:\Users\user\OneDrive\__강의\2학기\홈페이지_배포이력.md`** 하나다 (3개 과목 통합).

- **과목 세션**: 자료를 고치면 파일명 뒤에 `_v2`, `_v3` … 를 붙여 같은 폴더에 둔다(이전 판 보존).
  이력 표는 건드리지 않고, 필요하면 그 파일의 `배포 대기` 절에 적어 둔다.
  ※ 선형시스템 **강의노트 책**은 예외 — `LectureNotes/CLAUDE.md` 의 자체 버전 루틴을 따른다.
- **이 세션**: "강의자료 커밋해줘" 를 받으면 아래 순서로 처리한다.

1. 위 `홈페이지_배포이력.md` (통합본)를 읽는다.
2. 폴더 실제 파일 ↔ 이력 표를 대조해 **신규**와 **버전 올라간 것**(`_vN` 접미사)을 찾는다.
   `배포 대기` 절에 적힌 것도 함께 확인한다.
3. 반영할 목록을 **사용자에게 먼저 보고**하고 범위를 확인받는다.
4. `files/` 로 **버전 접미사를 붙여** 복사하고(`_v2` …), **이전 버전 PDF는 `git rm`**.
   `index.html` 의 `href`·`download` 도 새 파일명으로 바꾼다.
5. `index.html` 의 해당 `.material-meta`(쪽수·용량·날짜)와 Lecture 헤더의 `Last updated` 를 갱신한다.
6. commit & push.
7. **그 파일의 해당 과목 이력 표에 커밋 해시와 함께 한 줄 추가**하고, 처리한 `배포 대기` 항목을 지운다.

> 7번을 빼먹으면 다음 배포 때 대조가 어긋난다. 커밋과 이력 기록은 한 세트다.

## ⚠️ Git 주의사항 (이 저장소 특이사항 — Windows + OneDrive)
1. **commit 실패** `cannot update the ref 'HEAD' ... Invalid argument` 가 뜨면:
   `git config windows.appendAtomically false` 실행 (이미 로컬 설정돼 있으나 재발 시 재적용).
2. **push 시 브라우저 인증창**(Git Credential Manager)이 뜸 → headless로 완료 불가.
   **사용자가 직접 인증 완료**해야 push가 끝남. push가 멈춰 보이면 사용자에게 인증 요청.
3. 커밋 identity: name `PNJ`, email `namjinpark77@gmail.com`.

### 표준 커밋/푸시
```bash
git add index.html
git commit -m "메시지"
git push origin main   # 인증창 뜨면 사용자에게 완료 요청
```
push 후 `git status -sb` 가 `## main...origin/main` (ahead 없음)이면 성공. GitHub Pages 반영은 1~2분.

## 현재 페이지 구조 (참고)
`#home`(Hero + Research Overview + Lab Overview) · `#research`(Bento 그리드 R1~R5) ·
`#professor`(Profile / Career / Academic Activities / Research Grants / Patents) ·
`#publications`(Major Papers + Under Review/Published/Conferences 탭) · `#contact`(Footer).

## 최근 이력
- 2026-06-14: 최신 CV 반영 — Under Review 5→8편, 데이터 5건 정정, Research Grants 신설, Patents 신설.
