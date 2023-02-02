import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import { ArrowRight, Check } from 'phosphor-react'

import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
  // async function handleRegister() {}

  const { data: session } = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error

  async function handleConnectCalendar() {
    await signIn('google')
  }

  function handleNavigateToNextStep() {
    router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à media em que são agendados,
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {session ? (
              <Button disabled size="sm" onClick={() => signOut()}>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falaha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button
            type="submit"
            disabled={!session}
            onClick={handleNavigateToNextStep}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
