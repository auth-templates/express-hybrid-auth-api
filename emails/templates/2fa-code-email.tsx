import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import { getEmailTranslator } from '../utils/getEmailTranslator';

interface TwoFactorAuthEmailProps {
    verificationCode?: string;
    expiresInMinutes?: number;
    t: (key: string, options?: any) => string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

export default function TwoFactorAuthEmail({
    verificationCode = '123456',
    expiresInMinutes = 10,
    t
}: TwoFactorAuthEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>{t('emails.2fa-code-email.preview')}</Preview>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <Img
                                src={`${baseUrl}/static/logo.png`}
                                width="75"
                                height="45"
                                alt={t('emails.2fa-code-email.logoAlt', { defaultValue: 'Company Logo' })}
                            />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>
                                {t('emails.2fa-code-email.heading')}
                            </Heading>
                            <Text style={mainText}>
                                {t('emails.2fa-code-email.instruction', { expiresInMinutes })}
                            </Text>
                            <Section style={verificationSection}>
                                <Text style={verifyText}>
                                    {t('emails.2fa-code-email.label')}
                                </Text>
                                <Text style={codeText}>{verificationCode}</Text>
                            </Section>
                            <Text style={secondaryText}>
                                {t('emails.2fa-code-email.ignore')}
                            </Text>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                {t('emails.2fa-code-email.securityWarning')}
                            </Text>
                        </Section>
                    </Section>
                    <Text style={footerText}>
                        {t('emails.2fa-code-email.footer.supportPrompt')}{' '}
                        <Link href="https://example.com/support" target="_blank" style={link}>
                            {t('emails.2fa-code-email.footer.supportLink')}
                        </Link>.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

TwoFactorAuthEmail.PreviewProps = {
    verificationCode: '123456',
    expiresInMinutes: 10,
    t: getEmailTranslator('en'),
} satisfies TwoFactorAuthEmailProps;

const main = {
    backgroundColor: '#fff',
    color: '#212121',
};

const container = {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#eee',
};

const h1 = {
    color: '#333',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
};

const link = {
    color: '#2754C5',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
};

const text = {
    color: '#333',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0',
};

const imageSection = {
    backgroundColor: '#252f3d',
    display: 'flex',
    padding: '20px 0',
    alignItems: 'center',
    justifyContent: 'center',
};

const coverSection = { backgroundColor: '#fff' };

const upperSection = { padding: '25px 35px' };

const lowerSection = { padding: '25px 35px' };

const footerText = {
    ...text,
    fontSize: '12px',
    padding: '0 20px',
};

const mainText = { ...text, marginBottom: '14px' };

const secondaryText = { ...text, marginTop: '14px' };

const cautionText = { ...text, margin: '0px' };

const verifyText = {
    ...text,
    margin: 0,
    fontWeight: 'bold',
    textAlign: 'center' as const,
};

const codeText = {
    ...text,
    fontWeight: 'bold',
    fontSize: '36px',
    margin: '10px 0',
    textAlign: 'center' as const,
};

const verificationSection = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
