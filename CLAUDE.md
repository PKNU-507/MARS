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
  `C:\Users\user\OneDrive\Journal\_CV_Nam-Jin Park\CV_namjin.tex`
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
- **Patents**: 범례 `*` = Primary inventor. 주발명자는 `<strong class="accent-text">N.-J. Park*</strong>`.
- 새 항목은 **최신순(내림차순)** 으로 배치. 이름 표기는 `N.-J. Park`, `H.-G. Lee` 처럼 이니셜+하이픈 일관 유지.
- 새 섹션을 만들 땐 기존 클래스 재사용: `timeline` / `timeline-item` / `timeline-content glass-panel` /
  `timeline-title` / `timeline-desc` / `small-text timeline-subdesc` / `subsection-title` / `accent-text`.
- 발표 논문을 갱신하면 Publications 섹션의 `Last updated: YYYY. MM. DD.` 도 함께 갱신.

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
