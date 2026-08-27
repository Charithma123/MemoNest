export type Mood = {
    key: string;
    label: string;
    emoji: string;
    prompts: string[];
};

export const moods: Mood[] = [
    { key: "happy", label: "Happy", emoji: "😊", prompts: ["What made you smile today?", "Describe a moment that felt light and easy."] },
    { key: "sad", label: "Sad", emoji: "😢", prompts: ["What's sitting heavy on you right now?", "When did this feeling start today?"] },
    { key: "angry", label: "Angry", emoji: "😠", prompts: ["What crossed a line for you today?", "If this feeling could speak, what would it say?"] },
    { key: "anxious", label: "Anxious", emoji: "😰", prompts: ["What's the worry that keeps circling back?", "What's one thing within your control right now?"] },
    { key: "tired", label: "Tired", emoji: "😴", prompts: ["What took the most out of you today?", "What would real rest look like tonight?"] },
    { key: "grateful", label: "Grateful", emoji: "🙏", prompts: ["Who or what are you thankful for today?", "What's a small good thing that happened?"] },
    { key: "excited", label: "Excited", emoji: "🤩", prompts: ["What are you looking forward to?", "What's got your energy up today?"] },
    { key: "neutral", label: "Neutral", emoji: "😐", prompts: ["What happened today, plainly?", "Nothing has to stand out — just write what's true."] },
];