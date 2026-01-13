#!/bin/bash

# Check HTML files for common WCAG contrast violations
# This hook examines staged HTML changes for accessibility issues

# Color codes for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Flag to track if violations were found
violations_found=0

echo -e "${YELLOW}Checking HTML files for WCAG contrast violations...${NC}"

# Get list of staged HTML files
staged_html_files=$(git diff --cached --name-only --diff-filter=ACM | grep '\.html$')

if [ -z "$staged_html_files" ]; then
  echo -e "${GREEN}No HTML files staged for commit.${NC}"
  exit 0
fi

# Function to check for common contrast violations
check_contrast_violations() {
  local file=$1
  local violations=""

  # Check for blue text on blue backgrounds (common violation)
  if grep -qE 'color:\s*#[0-9a-fA-F]{6}.*background.*#[0-9a-fA-F]{6}' "$file" || \
     grep -qE 'background.*#[0-9a-fA-F]{6}.*color:\s*#[0-9a-fA-F]{6}' "$file"; then

    # Extract color combinations for detailed reporting
    blue_patterns=$(grep -nE '(color|background).*#[234][0-9a-fA-F]{5}' "$file" | head -5)

    if [ ! -z "$blue_patterns" ]; then
      violations="${violations}\n  ⚠️  Possible blue text on blue background:"
      violations="${violations}\n${blue_patterns}"
    fi
  fi

  # Check for light grey text (common violation)
  if grep -qE 'color:\s*#[cdefCDEF][0-9a-fA-F]{5}' "$file"; then
    light_grey=$(grep -nE 'color:\s*#[cdefCDEF][0-9a-fA-F]{5}' "$file" | head -3)
    if [ ! -z "$light_grey" ]; then
      violations="${violations}\n  ⚠️  Possible light grey text (may fail contrast):"
      violations="${violations}\n${light_grey}"
    fi
  fi

  # Check for opacity on text elements (known issue from preface)
  if grep -qE 'opacity:\s*0\.[1-9]' "$file"; then
    opacity_usage=$(grep -nE 'opacity:\s*0\.[1-9]' "$file")
    if [ ! -z "$opacity_usage" ]; then
      violations="${violations}\n  ⚠️  Opacity used (may reduce contrast):"
      violations="${violations}\n${opacity_usage}"
    fi
  fi

  # Check for button styling without explicit colors
  if grep -qE '\.btn\s*\{' "$file"; then
    # Extract button styles
    button_styles=$(sed -n '/\.btn\s*{/,/}/p' "$file")

    # Check if button has explicit background and color
    if ! echo "$button_styles" | grep -q 'background:' || \
       ! echo "$button_styles" | grep -q 'color:'; then
      violations="${violations}\n  ⚠️  Button class without explicit background/color"
    fi
  fi

  echo "$violations"
}

# Check each staged HTML file
for file in $staged_html_files; do
  if [ -f "$file" ]; then
    violations=$(check_contrast_violations "$file")

    if [ ! -z "$violations" ]; then
      echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
      echo -e "${RED}Contrast violations found in: $file${NC}"
      echo -e "$violations"
      echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
      violations_found=1
    fi
  fi
done

if [ $violations_found -eq 1 ]; then
  echo ""
  echo -e "${YELLOW}╔════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${YELLOW}║  WCAG CONTRAST CHECK FAILED                                    ║${NC}"
  echo -e "${YELLOW}╚════════════════════════════════════════════════════════════════╝${NC}"
  echo ""
  echo -e "${YELLOW}Potential accessibility issues detected in HTML files.${NC}"
  echo ""
  echo -e "WCAG AA requires:"
  echo -e "  • Normal text: 4.5:1 contrast ratio"
  echo -e "  • Large text (18pt+ or 14pt+ bold): 3:1"
  echo -e "  • UI components: 3:1"
  echo ""
  echo -e "Common violations:"
  echo -e "  • Blue text on blue backgrounds"
  echo -e "  • Light grey text on white backgrounds"
  echo -e "  • Using opacity without verifying final contrast"
  echo ""
  echo -e "Verify contrast ratios using:"
  echo -e "  • Browser DevTools (Inspect → Accessibility)"
  echo -e "  • Online: https://webaim.org/resources/contrastchecker/"
  echo -e "  • Online: https://coolors.co/contrast-checker"
  echo ""
  echo -e "Book reference:"
  echo -e "  • Preface (lines 19-29): opacity: 0.9 example"
  echo -e "  • LEARNINGS.md: Accessibility violations section"
  echo ""
  echo -e "${YELLOW}Options:${NC}"
  echo -e "  1. Fix the contrast issues and re-stage the files"
  echo -e "  2. Run: ${GREEN}git commit --no-verify${NC} to bypass (NOT recommended)"
  echo ""

  exit 1
fi

echo -e "${GREEN}✓ No obvious contrast violations detected${NC}"
echo -e "${YELLOW}Note: This is a basic check. Always verify contrast manually.${NC}"
exit 0
