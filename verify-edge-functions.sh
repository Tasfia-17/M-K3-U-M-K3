#!/bin/bash

echo "========================================="
echo "MΔK3 UΝMΔK3 - Edge Functions Verification"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
TOTAL=0
PASSED=0
FAILED=0

# Check if supabase functions directory exists
if [ ! -d "supabase/functions" ]; then
    echo -e "${RED}✗ supabase/functions directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ supabase/functions directory exists${NC}"
echo ""

# List of expected edge functions
FUNCTIONS=("minimax-audio" "minimax-blueprint" "minimax-chat" "minimax-image" "minimax-video" "minimax-vision")

echo "Checking Edge Functions..."
echo "========================================="

for func in "${FUNCTIONS[@]}"; do
    TOTAL=$((TOTAL + 1))
    FUNC_DIR="supabase/functions/$func"
    INDEX_FILE="$FUNC_DIR/index.ts"

    echo -n "[$TOTAL] $func: "

    if [ ! -d "$FUNC_DIR" ]; then
        echo -e "${RED}✗ Directory missing${NC}"
        FAILED=$((FAILED + 1))
        continue
    fi

    if [ ! -f "$INDEX_FILE" ]; then
        echo -e "${RED}✗ index.ts missing${NC}"
        FAILED=$((FAILED + 1))
        continue
    fi

    # Check file size (should not be empty)
    FILE_SIZE=$(wc -c < "$INDEX_FILE")
    if [ "$FILE_SIZE" -lt 100 ]; then
        echo -e "${RED}✗ index.ts too small (${FILE_SIZE} bytes)${NC}"
        FAILED=$((FAILED + 1))
        continue
    fi

    # Check for required imports and patterns
    if ! grep -q "jsr:@supabase/functions-js/edge-runtime" "$INDEX_FILE"; then
        echo -e "${RED}✗ Missing Supabase edge runtime import${NC}"
        FAILED=$((FAILED + 1))
        continue
    fi

    if ! grep -q "corsHeaders" "$INDEX_FILE"; then
        echo -e "${RED}✗ Missing CORS headers${NC}"
        FAILED=$((FAILED + 1))
        continue
    fi

    if ! grep -q "Deno.serve" "$INDEX_FILE"; then
        echo -e "${RED}✗ Missing Deno.serve${NC}"
        FAILED=$((FAILED + 1))
        continue
    fi

    echo -e "${GREEN}✓ OK (${FILE_SIZE} bytes)${NC}"
    PASSED=$((PASSED + 1))
done

echo ""
echo "========================================="
echo "Verification Summary"
echo "========================================="
echo -e "Total Functions: $TOTAL"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All edge functions are ready for deployment!${NC}"
    echo ""
    echo "Next Steps:"
    echo "1. Ensure your .env file has VITE_MINIMAX_API_KEY set"
    echo "2. Run 'npm run build' to build the project"
    echo "3. Open test-minimax.html to test API integration"
    echo "4. Run 'npm run dev' to start the development server"
    exit 0
else
    echo -e "${RED}✗ Some edge functions need attention${NC}"
    exit 1
fi
