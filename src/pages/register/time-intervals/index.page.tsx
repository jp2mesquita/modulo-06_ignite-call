import { useSession } from 'next-auth/react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'

import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  Intervalinputs,
  IntervalItem,
} from './styles'
import { getWeekDays } from '../../../utils/get-week-days'

const timeIntervalsFormSchema = z.object({})

export default function TimeIntervals() {
  const { data: session } = useSession()

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enable: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enable: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const intervals = watch('intervals')

  async function handleSetTimeIntervals() {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enable`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                        />
                      )
                    }}
                  />

                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <Intervalinputs>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={!intervals[index].enable}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={!intervals[index].enable}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </Intervalinputs>
              </IntervalItem>
            )
          })}
        </IntervalContainer>

        <Button type="submit" disabled={!session}>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
