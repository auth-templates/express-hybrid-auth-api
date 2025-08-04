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
import { getEmailTranslator } from '../utils/getEmailTranslator.js';

interface TwoFactorDisabledEmailProps {
    assetsUrl: string,
    frontendUrl: string,
    t: (key: string, options?: any) => string;
}

export default function TwoFactorDisabledEmail({ 
    assetsUrl,
    t, 
    frontendUrl 
}: TwoFactorDisabledEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>{t('emails.2fa-disabled.preview')}</Preview>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <Img
                                src={`${assetsUrl}/static/logo.png`}
                                width="75"
                                height="45"
                                alt={t('emails.2fa-disabled.logoAlt', { defaultValue: 'Company Logo' })}
                            />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>{t('emails.2fa-disabled.heading')}</Heading>
                            <Text style={mainText}>
                                {t('emails.2fa-disabled.body')}
                            </Text>
                            <Text style={secondaryText}>
                                {t('emails.2fa-disabled.recommendation')}
                            </Text>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                {t('emails.2fa-disabled.warning')}
                            </Text>
                        </Section>
                    </Section>
                    <Text style={footerText}>
                        {t('emails.2fa-disabled.footer.supportPrompt')}{' '}
                        <Link href={`${frontendUrl}/support`} target="_blank" style={link}>
                            {t('emails.2fa-disabled.footer.supportLink')}
                        </Link>.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

TwoFactorDisabledEmail.PreviewProps = {
    assetsUrl: 'http://localhost:3000',
    frontendUrl: 'http://localhost:3000',
    t: getEmailTranslator(),
} satisfies TwoFactorDisabledEmailProps;

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