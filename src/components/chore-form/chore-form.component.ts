import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HouseService } from '../../services/house.service';
import { UserService } from '../../services/user.service';
import moment from 'moment';
import { ChoreService } from '../../services/chore.service';

@Component({
    selector: 'chore-form',
    templateUrl: 'chore-form.component.html'
})
export class ChoreFormComponent {

    allUsers = [this.userService.activeUser].concat(this.houseService.roommates);
    choreForm: FormGroup;
    days = [
        { day: 'Sun', selected: false },
        { day: 'Mon', selected: false },
        { day: 'Tue', selected: false },
        { day: 'Wed', selected: false },
        { day: 'Thu', selected: false },
        { day: 'Fri', selected: false },
        { day: 'Sat', selected: false },
    ];
    assignedUsers: any[] = [];

    @Input() chore: any;

    constructor(private houseService: HouseService,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private choreService: ChoreService) { }

    ngOnInit() {
        this.assignedUsers = this.chore.cycle;

        this.choreForm = this.formBuilder.group({
            name: new FormControl(this.chore.title),
            daysDue: this.buildDaysDue(),
            assigned: this.buildAssigned(this.assignedUsers)
        });
    }

    get daysDueFC() {
        return this.choreForm.get('daysDue');
    };

    get assignedFC() {
        return this.choreForm.get('assigned');
    };

    buildAssigned(currentAssigned) {
        let assigned = this.allUsers.map(user => {
            const userExistsInCycle = currentAssigned.some(userInCycle => user.uid === userInCycle.uid);
            return userExistsInCycle;
        });

        const formValues = assigned.map(selected => {
            return this.formBuilder.control(selected);
        });

        return this.formBuilder.array(formValues);
    }

    buildDaysDue() {
        if (this.chore && this.chore.daysDue.length) {
            this.chore.daysDue.forEach(dueIndex => {
                this.days[dueIndex].selected = true;
            });
        }

        const formValues = this.days.map(day => {
            return this.formBuilder.control(day.selected);
        });
        return this.formBuilder.array(formValues);
    }

    setAssignedUsers(selected, user) {
        if (selected) {
            this.assignedUsers = this.assignedUsers.filter(assigned => assigned.uid !== user.uid);
        } else {
            this.assignedUsers.push(user);
        }
    }

    submitForm(form) {
        const daysDue: number[] = form.daysDue.map((day, index) => day ? index : undefined).filter(value => value !== undefined);
        const cycle = this.assignedUsers.map((user, index) => ({ index, uid: user.uid, name: user.name }));
        const title = form.name;
        const choreData = { title, daysDue, cycle };
        let currentDayDue: any;

        // Find the next available day (return index of daysDue array) that the chore can be assigned to in this week, if any exists...
        const nextAvailableDayIndex = daysDue.find(day => {
            const dayInDaysDueArray = moment().day(day).format('YYYY-MM-DD') // This is the day of the current week of those daysDue values
            
            // Is the day we're checking After today -- then return true
            if (moment(dayInDaysDueArray).isAfter(moment(), 'day')) {
                return true;
            }
        })

        if (nextAvailableDayIndex !== undefined) {
            currentDayDue = {
                date: moment().day(nextAvailableDayIndex).format('YYYY-MM-DD'),
                daysDueIndex: daysDue.indexOf(nextAvailableDayIndex)
            }
        } else {
            currentDayDue = {
                date: moment().day(daysDue[0]).add(1, 'weeks').format('YYYY-MM-DD'),
                daysDueIndex: 0
            }
        }

        const readyChoreData = {
            id: this.chore.id,
            title: title,
            daysDue: JSON.stringify(daysDue),
            cycle: JSON.stringify(cycle),
            currentAssigned: cycle[0],
            currentDueDay: currentDayDue,
            upcoming: cycle[1] || cycle[0]
        }

        console.log('processed chore:', readyChoreData);

        this.choreService.editChore(this.chore.id, readyChoreData)
            .subscribe(() => {
                console.log('finished editing chore');   
            })
    }
}
