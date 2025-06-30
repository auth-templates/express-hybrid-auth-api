
export type Message = {
    text: string;
    severity: 'error' | 'warning' | 'info' | 'success';
};

export type ApiMessageResponse = {
    messages: Message[]
}