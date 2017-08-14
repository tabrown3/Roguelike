import EventHub from './EventHub';

export default class GameEventHubs {
    public keyDownHub: EventHub = new EventHub();
    public worldTickHub: EventHub = new EventHub();
}