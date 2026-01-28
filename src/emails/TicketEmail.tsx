
import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface TicketEmailProps {
    name: string;
    guests: number;
    companions: string;
    meat: string;
    drinks: string;
}

const baseUrl = 'https://aniversario-olivia.vercel.app';

export const TicketEmail = ({
    name,
    guests,
    companions,
    meat,
    drinks,
}: TicketEmailProps) => {

    return (
        <Html>
            <Head />
            <Preview>Oba! Sua presença foi confirmada no Aniversário da Olívia! 🌼</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={{ position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: -30, right: -30 }}>
                            <Img
                                src={`${baseUrl}/daisy.png`}
                                width="100"
                                height="100"
                                alt="Daisy"
                                style={{ opacity: 0.8 }}
                            />
                        </div>

                        <Heading style={heading}>Oba! Você vai! 🎉</Heading>
                        <Text style={subheading}>Sua presença foi confirmada.</Text>

                        <Section style={card}>
                            <Row style={{ borderBottom: '1px solid rgba(93, 64, 55, 0.1)', paddingBottom: '12px', marginBottom: '12px' }}>
                                <Column>
                                    <Text style={labelLarge}>Convidado VIP</Text>
                                    <Text style={valueLarge}>{name}</Text>
                                </Column>
                            </Row>

                            <Row>
                                <Column style={{ paddingRight: '12px' }}>
                                    <div style={statBox}>
                                        <Text style={labelSmall}>Total</Text>
                                        <Text style={valueSmall}>{guests} {guests === 1 ? 'Pessoa' : 'Pessoas'}</Text>
                                    </div>
                                </Column>
                                <Column style={{ paddingLeft: '12px' }}>
                                    <div style={statBox}>
                                        <Text style={labelSmall}>Data</Text>
                                        <Text style={valueSmall}>16/02</Text>
                                    </div>
                                </Column>
                            </Row>

                            {guests > 1 && (
                                <Row style={{ marginTop: '16px' }}>
                                    <Column>
                                        <Text style={labelSmall}>Acompanhantes</Text>
                                        <Text style={textNormal}>{companions}</Text>
                                    </Column>
                                </Row>
                            )}

                            <Row style={{ marginTop: '16px', backgroundColor: 'rgba(255, 215, 0, 0.1)', padding: '10px', borderRadius: '8px' }}>
                                <Column>
                                    <Text style={{ ...labelSmall, marginBottom: '4px' }}>Sugestão para levar:</Text>
                                    <Text style={textNormal}>🍖 {meat} de Carne</Text>
                                    <Text style={textNormal}>🥤 {drinks} de Bebida</Text>
                                </Column>
                            </Row>

                        </Section>

                        <Text style={footer}>
                            TICKET DIGITAL • ANIVERSÁRIO DA OLÍVIA
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default TicketEmail;

// Styles
const main = {
    backgroundColor: '#ffffff',
    fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif',
};

const container = {
    backgroundColor: '#FEFCF0',
    border: '4px dashed rgba(255, 215, 0, 0.4)',
    borderRadius: '24px',
    margin: '40px auto',
    padding: '40px 20px',
    maxWidth: '480px',
    position: 'relative' as const,
};

const heading = {
    color: '#FFD700',
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '0 0 4px',
};

const subheading = {
    color: 'rgba(93, 64, 55, 0.6)',
    fontSize: '14px',
    textAlign: 'center' as const,
    margin: '0 0 24px',
};

const card = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    border: '2px solid rgba(255, 215, 0, 0.1)',
};

const labelLarge = {
    color: 'rgba(93, 64, 55, 0.5)',
    fontSize: '10px',
    textTransform: 'uppercase' as const,
    fontWeight: 'bold',
    letterSpacing: '1px',
    margin: '0',
};

const valueLarge = {
    color: '#5D4037',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '4px 0 0',
};

const statBox = {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: '12px',
    padding: '12px',
    textAlign: 'center' as const,
};

const labelSmall = {
    color: 'rgba(93, 64, 55, 0.5)',
    fontSize: '10px',
    textTransform: 'uppercase' as const,
    fontWeight: 'bold',
    margin: '0 0 2px',
};

const valueSmall = {
    color: '#5D4037',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0',
};

const textNormal = {
    color: '#5D4037',
    fontSize: '14px',
    margin: '0',
};

const footer = {
    color: 'rgba(93, 64, 55, 0.3)',
    fontSize: '10px',
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    fontWeight: 'bold',
    marginTop: '32px',
};
