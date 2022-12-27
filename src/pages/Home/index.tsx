import { Pause, Play } from 'phosphor-react'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import Confetti from 'react-confetti'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './style'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Report the task!'),
  minutesAmount: zod
    .number()
    .min(5, 'The cycle needs a minimum of 5 minutes.')
    .max(60, 'The cycle needs a maximum of 60 minutes.'),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CycleContext)
  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch /* reset */ } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <Pause size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
      {/* {minutes === '0' && seconds === '0' ? (
        <Confetti
          drawShape={(ctx) => {
            ctx.beginPath()
            for (let i = 0; i < 22; i++) {
              const angle = 0.35 * i
              const x = (0.2 + 1.5 * angle) * Math.cos(angle)
              const y = (0.2 + 1.5 * angle) * Math.sin(angle)
              ctx.lineTo(x, y)
            }
            ctx.stroke()
            ctx.closePath()
          }}
        />
      ) : null} */}
    </HomeContainer>
  )
}
