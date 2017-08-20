import EventHub from './EventHub';

import { relayable, relayableContainer } from '../state/StateRegistry';

export default class GameEventHubs {
    @relayable()
    public keyDownHub: EventHub = new EventHub();
    @relayable()
    public worldTickHub: EventHub = new EventHub();
}