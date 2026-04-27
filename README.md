# ethosclone
An incremental game inspired by the Ethos Idle game. Ethos is interesting in ite eaarly game and approach to challenges, but quickly becaomes a slog thanks to a difficult curve and punishing challenge requirements. 

It also has the potential for a lot more intersting mechanics in the form of upgrades, especially early: late game upgrades have some choices, but most are just box ticking and quite tedious after a while. 

Fighting enemy civs is a great examp[le of this: its an interesting mechanic to choose bewteen conquiring them immediately by focusing on weapons, or waiting long term by focusing on Culture. However, in practical terms none of it matters: if you just level everyhting equally you end up with enough of each,m and there is not enough agency in upgrades or choices to actual specialise in one or the other. There are so many neigbors to fight and they all have such incremental values that they are inconsequential: if there were less of them, each would be more of a milestone nbad therefor worth investing in one or the opther in the short term. As a result, a potentially intersting mechanic is not that interesting because theres limited interactions

Goals of this rework: 
* Increase gaps bewteen eras to avoid bloat
* add more choices in early game
* add more agency when completing challenges
* less punish if you fail a challenge and waste days of progress.
* Add reasons to push and/or focus on specific technologies other others
* Add opportunity cost scenarios: ie. if I do this, i cant do that

Thanks and inspiration from: 
https://dragonmegaliths.com/games/ethos

## Core Gameplay

An incremental game where you progress through the ages, building up technologies and the size of your empire

* You start in the Stone ages with three core technologies to research. Each has a name, an effect, and a color based on its effect.
  * Fire
  * Tools
  * Singing
* All eras have three  to four technologies
* You have a base research speed equal to your population
* You start with 10 population
* You can click on one of these technologies to start researching it
* You can only research one technology at a time: clicking another one will start on that, and sto on the other
* All technologiues have a base amount of research it takes to gain a level: which increases every level.
* To progress to the next age, you must research 10 total levels in any given technology in the current era
  

## Stats

Levels in technologies provides increases to specific stats. We want to borrow the Ethos Idle idea of having multiple interconnected stats that contribuite to differnt things: so in theory you can focus on one or the other to acheive different outcomes. 
Stats in turn have effects on other areas of the game such as population growth. Population grorth is the real driver of progress, so it is central to most stats. 

Each of these four below can be increased by levels in a technology. 

* Food: increases the base rate of population growth as a percentage of the current population
* Industry: increasese the rate of production of Infrastructure
* Culture: increases happiness and reduces unrest 
* Military: reduces unrest and decreases happiness

There is also secondary stats aquired by other mechanics: 

* Infrastructure: built over time based on your total level of industry. Having less Infrastructure than population negatively effects population growth
* Army: the standing army. This increases over time based on your total Military, with dminishing returns beyound your Military cap. 
* Influence: this slowly converts enemies to our cause over time, as an alternative to force. 
* Unrest: a modifier based on the difference bewteen your military anmd industry: if you have less military than industry, you get a global negative modifiuer to growth speed.
* Happiness: the inverse of unrest: a modifier based on the difference between Culture and Military. Having positive happiness provides a bonus to research speed. 
* Land: provides a global modifier to both population growth and infrastrcutture  build rate

## Inspiration and Upgrades



## Colors

Every technology has a color. The primary colors are red, ytellow and blue. Initially, all three have the same base research rate, but alongside stat increases, technologies can also be multipliers per level for specific colours

Colours can also be mixed, meaning bonuses from both apply to them. These are special technologies and can be very powerful, so are rare. THese are green, purple and orange mixing the primary colours together.

## Upgrades and Inpsiration

This is a special currency used to unlock upgrades. You dont spend inspriation to unlock things, but sometimes an unlock is a choice, or increases the cost of other upgrades forcing you to wait. 
You aquire 1 inspiration whenever you get a level in a technology, encouraging you to go back and research old levels. 

There is a dedicated Upgrades panel, showing different kinds of upgrades. The main section shows 3 upgrades at a time, which have a base cost of 10 inspiration. These have a fixed order, and when one is purchase, the next one is shown. 

When an upgrade is purchased, the OTHER upgrades have their cost multiplied by 2. Meaning the first upgrade costs 10, but the next costs 20, the next costs 40, then 80 and so on. Costs increase over time, but the player has agency over choices to optimise their run. 

Example first upgrades: 

* Cooperation - Singing provides an additional +1 Inspiration
* Heirarchy - Fire gains +5% to Red research
* Cultivation - Fire gains +2 to Food
* Shelter - Singing gains +2 to culture
* Atlatl - Tools gains +3 Military

Selecting any of the first three will expose Shelter: choosing again will expose Atatl. With this system it is possible to ignore initial upgrades and target the ones you want for the playstyle you want. This is generally favourable as later upgrades are more powerful than others, and effect Technologies in later eras. 


## Prestige

After reaching a specific milstone of population, the player gains the option to Prestige. This completely resets their technologies and starts the game afresh. 
From this they earn prestige currency, which can be used to purchase upgrades that enhance their progress through the game a second time. Progress towards 

There are multiple prestige milestones, each with increasing rewards: 

* Tribe - 100 population
* Hamlet - 300 population
* Village - 800 population
* Town - 3000 population
* Fiefdom - 10000 population
* City - 25,000 population
* Metropolis - 150,000 population
* Province - 1,000,000 population
* Nation - 25,000,000 population
* Empire - 300,000,000 population
* Megalopolis - 1,000,000,000 population
* Ecumeopolis - 100,000,000,000 population

Prestige formula is the square root of total population, times 10 to the power of the number of prestige milestones / 100 rounded up to the nearest integer. 

Prestige points can be used to purchase upgrades rthat persist between runs, increasing your overall power and speed to get levels and therefore your ability to reach higher tiers. 

## Challenges

Challenges are game modifiers that alter the conditions of the game and ( hopefully) provide a different gameplay experience. Challenges also make the game significantly harder.

We want to replicate the Challenge Level system from Ethos, which duplicates the bonuses from completed challenges based on how many challemges were completed alongside that challenge. 

So if I complete Challenge 1 on its oiwn, I get one level in it, and therefore one instance of its reward ( ie. 20% more Culture gained ). If I then complete it alongside another challenge, BOTH challenges are now level 2, and I get 2 instances of the rewards for BOTH challenges. 

Initially challnges should be tackled individually, but with the rewards that come with them. 

Unlike Ethod Idle, if the user is struggling with a challenge, they do not hasve to completely forfeit the run.  They can opt out of any or all of their challenges mid-run. However they also forfeit the rewards for completing that many challenges and therefore the levels they would hve gained. 
