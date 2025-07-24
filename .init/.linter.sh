#!/bin/bash
cd /home/kavia/workspace/code-generation/converso-ai-chatbot-c13e7c87/frontend_react_chatbot
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

