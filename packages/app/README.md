# @algorithm-visualizer/app

This package contains the application component.

<br>
<br>
<br>

## **Application Flow**

<br>

```mermaid
stateDiagram-v2
  direction LR

  state App {
    direction LR


    state Menu {
      direction LR

      a1 : select option
      b1 : toggle algorithm family options
      c1 : toggle algorithm options
      d1 : display algorithm type description
      e1 : display algorithm family description

      state choice1 <<choice>>

      [*] --> a1
      a1 --> choice1
      choice1 --> b1: [algorithm type selected]
      choice1 --> c1: [algorithm family selected]
      choice1 --> [*]: [algorithm selected]
      b1 --> d1
      c1 --> e1
      d1 --> a1
      e1 --> a1
    }


    state Visualization {
      direction TB

      a2: visualize result


      state AlgorithmDescription {
        direction LR

        a3: describe core idea
        b3: describe input data
        c3: generate input data
        d3: visualize input data
        e3: describe output data
        f3: visualize output data
        g3: execute algorithm

        state fork1 <<fork>>
        state fork2 <<fork>>
        state join1 <<join>>
        state join2 <<join>>

        [*] --> fork1
        fork1 --> b3
        fork1 --> c3
        fork1 --> d3
        fork1 --> g3
        b3 --> join1
        c3 --> join1
        d3 --> join1
        g3 --> join1
        join1 --> a3
        a3 --> fork2
        fork2 --> e3
        fork2 --> f3
        e3 --> join2
        f3 --> join2
        join2 --> [*]
      }


      state AlgorithmExecution {
        direction TB

        state choice2 <<choice>>
        state choice3 <<choice>>


        state AlgorithmStage {
          direction LR

          a4: describe algorithm stage
          b4: visualize data structure

          state fork3 <<fork>>
          state join3 <<join>>

          [*] --> fork3
          fork3 --> a4
          fork3 --> b4
          a4 --> join3
          b4 --> join3
          join3 --> [*]
        }


        state AlgorithmStep {
          direction LR

          a5: execute algorithm step
          b5: highlight changes of executed step
          c5: describe execution step

          [*] --> a5
          a5 --> b5
          b5 --> c5
          c5 --> [*]
        }


        [*] --> AlgorithmStage
        AlgorithmStage --> AlgorithmStep
        AlgorithmStep --> choice2
        choice2 --> AlgorithmStep: [stage not completed]
        choice2 --> choice3: [stage completed]
        choice3 --> AlgorithmStage: [algorithm not terminated]
        choice3 --> [*]: [algorithm terminated]

      }


      [*] --> AlgorithmDescription
      AlgorithmDescription --> AlgorithmExecution
      AlgorithmExecution --> a2
      a2 --> [*]

    }

    [*] --> Menu
    Menu --> Visualization
    Visualization --> Menu

  }

  [*] --> App
  App --> [*]
```

<br>
<br>
<br>

## **Wireframes**

<br>
<br>

### **Mobile**

<br>

#### **Landing Page**

![Image](./wireframes/mobile/landingPage.png)

<br>

#### **Menu**

![Image](./wireframes/mobile/menuTopCategory.png)
![Image](./wireframes/mobile/menuSubCategory.png)
![Image](./wireframes/mobile/menuSelection.png)

<br>

#### **Algorithm Description**

![Image](./wireframes/mobile/algorithmDescriptionInputData.png)
![Image](./wireframes/mobile/algorithmDescriptionCoreIdea.png)
![Image](./wireframes/mobile/algorithmDescriptionOutputData.png)

<br>

#### **Algorithm Execution**

![Image](./wireframes/mobile/algorithmExecution.png)

<br>

### **Desktop**

<br>

#### **Landing Page**

![Image](./wireframes/desktop/landingPage.png)

<br>

#### **Menu**

![Image](./wireframes/desktop/menuTopCategory.png)
![Image](./wireframes/desktop/menuSubCategory.png)

<br>

#### **Algorithm Description**

![Image](./wireframes/desktop/algorithmDescription.png)

<br>

#### **Algorithm Execution**

![Image](./wireframes/desktop/algorithmExecution.png)
