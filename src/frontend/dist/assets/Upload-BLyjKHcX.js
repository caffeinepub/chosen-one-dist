import { t as createLucideIcon, r as reactExports, w as useComposedRefs, j as jsxRuntimeExports, x as cn, d as useAuth, c as useActor, g as useQueryClient, k as useAppStore, B as Button, U as Upload$1, l as ue, E as ExternalBlob, T as TrackType, L as Link, I as Input, f as createActor } from "./index-DkJerdwd.js";
import { B as Badge } from "./badge-DHFyt5Sg.js";
import { L as Label } from "./label-CvgpiRfx.js";
import { u as useControllableState, P as Primitive, c as composeEventHandlers, a as usePrevious, b as useSize, d as createContextScope, e as useId, f as createCollection, g as useDirection, h as useCallbackRef, S as Select, i as SelectTrigger, j as SelectValue, k as SelectContent, l as SelectItem } from "./select-LVz0_0Ca.js";
import { P as Presence } from "./index-BUSwM0dO.js";
import { T as Textarea } from "./textarea-BgC_6g8s.js";
import { u as useMutation } from "./useMutation-B16DtIF_.js";
import { P, a as Pause } from "./wavesurfer.esm-D1OwqQyW.js";
import { L as Lock } from "./lock-CY3ETy0P.js";
import { C as CircleCheckBig } from "./circle-check-big-DVmtTslx.js";
import { T as Trash2 } from "./trash-2-q0bt8BHE.js";
import { P as Play } from "./play-D9LgaoRG.js";
import "./chevron-up-DGzP3eNI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3", key: "rslqgf" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    {
      d: "M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0",
      key: "9f7x3i"
    }
  ]
];
const FileAudio = createLucideIcon("file-audio", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root$1 = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
class t {
  constructor() {
    this.listeners = {};
  }
  on(t2, e2, i2) {
    if (this.listeners[t2] || (this.listeners[t2] = /* @__PURE__ */ new Set()), null == i2 ? void 0 : i2.once) {
      const i3 = (...n2) => {
        this.un(t2, i3), e2(...n2);
      };
      return this.listeners[t2].add(i3), () => this.un(t2, i3);
    }
    return this.listeners[t2].add(e2), () => this.un(t2, e2);
  }
  un(t2, e2) {
    var i2;
    null === (i2 = this.listeners[t2]) || void 0 === i2 || i2.delete(e2);
  }
  once(t2, e2) {
    return this.on(t2, e2, { once: true });
  }
  unAll() {
    this.listeners = {};
  }
  emit(t2, ...e2) {
    this.listeners[t2] && this.listeners[t2].forEach((t3) => t3(...e2));
  }
}
class e extends t {
  constructor(t2) {
    super(), this.subscriptions = [], this.isDestroyed = false, this.options = t2;
  }
  onInit() {
  }
  _init(t2) {
    this.isDestroyed && (this.subscriptions = [], this.isDestroyed = false), this.wavesurfer = t2, this.onInit();
  }
  destroy() {
    this.emit("destroy"), this.subscriptions.forEach((t2) => t2()), this.subscriptions = [], this.isDestroyed = true, this.wavesurfer = void 0;
  }
}
function i(t2, e2) {
  const n2 = e2.xmlns ? document.createElementNS(e2.xmlns, t2) : document.createElement(t2);
  for (const [t3, s2] of Object.entries(e2)) if ("children" === t3 && s2) for (const [t4, e3] of Object.entries(s2)) e3 instanceof Node ? n2.appendChild(e3) : "string" == typeof e3 ? n2.appendChild(document.createTextNode(e3)) : n2.appendChild(i(t4, e3));
  else "style" === t3 ? Object.assign(n2.style, s2) : "textContent" === t3 ? n2.textContent = s2 : n2.setAttribute(t3, s2.toString());
  return n2;
}
function n(t2, e2, n2) {
  const s2 = i(t2, e2 || {});
  return null == n2 || n2.appendChild(s2), s2;
}
function s(t2) {
  let e2 = t2;
  const i2 = /* @__PURE__ */ new Set();
  return { get value() {
    return e2;
  }, set(t3) {
    Object.is(e2, t3) || (e2 = t3, i2.forEach((t4) => t4(e2)));
  }, update(t3) {
    this.set(t3(e2));
  }, subscribe: (t3) => (i2.add(t3), () => i2.delete(t3)) };
}
function r(t2, e2) {
  let i2;
  const n2 = () => {
    i2 && (i2(), i2 = void 0), i2 = t2();
  }, s2 = e2.map((t3) => t3.subscribe(n2));
  return n2(), () => {
    i2 && (i2(), i2 = void 0), s2.forEach((t3) => t3());
  };
}
function o(t2, e2) {
  const i2 = s(null), n2 = (t3) => {
    i2.set(t3);
  };
  return t2.addEventListener(e2, n2), i2._cleanup = () => {
    t2.removeEventListener(e2, n2);
  }, i2;
}
function l(t2) {
  const e2 = t2._cleanup;
  "function" == typeof e2 && e2();
}
function h(t2, e2 = {}) {
  const { threshold: i2 = 3, mouseButton: n2 = 0, touchDelay: r2 = 100 } = e2, o2 = s(null), h2 = /* @__PURE__ */ new Map(), a2 = matchMedia("(pointer: coarse)").matches;
  let d2 = () => {
  };
  const c = (e3) => {
    if (e3.button !== n2) return;
    if (h2.set(e3.pointerId, e3), h2.size > 1) return;
    let s2 = e3.clientX, l2 = e3.clientY, c2 = false;
    const u = Date.now(), v = t2.getBoundingClientRect(), { left: p, top: g } = v, m = (t3) => {
      if (t3.defaultPrevented || h2.size > 1) return;
      if (a2 && Date.now() - u < r2) return;
      const e4 = t3.clientX, n3 = t3.clientY, d3 = e4 - s2, v2 = n3 - l2;
      (c2 || Math.abs(d3) > i2 || Math.abs(v2) > i2) && (t3.preventDefault(), t3.stopPropagation(), c2 || (o2.set({ type: "start", x: s2 - p, y: l2 - g }), c2 = true), o2.set({ type: "move", x: e4 - p, y: n3 - g, deltaX: d3, deltaY: v2 }), s2 = e4, l2 = n3);
    }, f = (t3) => {
      if (h2.delete(t3.pointerId), c2) {
        const e4 = t3.clientX, i3 = t3.clientY;
        o2.set({ type: "end", x: e4 - p, y: i3 - g });
      }
      d2();
    }, b = (t3) => {
      h2.delete(t3.pointerId), t3.relatedTarget && t3.relatedTarget !== document.documentElement || f(t3);
    }, E = (t3) => {
      c2 && (t3.stopPropagation(), t3.preventDefault());
    }, C = (t3) => {
      t3.defaultPrevented || h2.size > 1 || c2 && t3.preventDefault();
    };
    document.addEventListener("pointermove", m), document.addEventListener("pointerup", f), document.addEventListener("pointerout", b), document.addEventListener("pointercancel", b), document.addEventListener("touchmove", C, { passive: false }), document.addEventListener("click", E, { capture: true }), d2 = () => {
      document.removeEventListener("pointermove", m), document.removeEventListener("pointerup", f), document.removeEventListener("pointerout", b), document.removeEventListener("pointercancel", b), document.removeEventListener("touchmove", C), setTimeout(() => {
        document.removeEventListener("click", E, { capture: true });
      }, 10);
    };
  };
  t2.addEventListener("pointerdown", c);
  return { signal: o2, cleanup: () => {
    d2(), t2.removeEventListener("pointerdown", c), h2.clear(), l(o2);
  } };
}
class a extends t {
  constructor(t2, e2, i2 = 0) {
    var n2, s2, r2, o2, l2, h2, a2, d2, c, u;
    super(), this.totalDuration = e2, this.numberOfChannels = i2, this.element = null, this.minLength = 0, this.maxLength = 1 / 0, this.contentEditable = false, this.subscriptions = [], this.updatingSide = void 0, this.isRemoved = false, this.subscriptions = [], this.id = t2.id || `region-${Math.random().toString(32).slice(2)}`, this.start = this.clampPosition(t2.start), this.end = this.clampPosition(null !== (n2 = t2.end) && void 0 !== n2 ? n2 : t2.start), this.drag = null === (s2 = t2.drag) || void 0 === s2 || s2, this.resize = null === (r2 = t2.resize) || void 0 === r2 || r2, this.resizeStart = null === (o2 = t2.resizeStart) || void 0 === o2 || o2, this.resizeEnd = null === (l2 = t2.resizeEnd) || void 0 === l2 || l2, this.color = null !== (h2 = t2.color) && void 0 !== h2 ? h2 : "rgba(0, 0, 0, 0.1)", this.minLength = null !== (a2 = t2.minLength) && void 0 !== a2 ? a2 : this.minLength, this.maxLength = null !== (d2 = t2.maxLength) && void 0 !== d2 ? d2 : this.maxLength, this.channelIdx = null !== (c = t2.channelIdx) && void 0 !== c ? c : -1, this.contentEditable = null !== (u = t2.contentEditable) && void 0 !== u ? u : this.contentEditable, this.element = this.initElement(), this.setContent(t2.content), this.setPart(), this.renderPosition(), this.initMouseEvents();
  }
  clampPosition(t2) {
    return Math.max(0, Math.min(this.totalDuration, t2));
  }
  setPart() {
    var t2;
    const e2 = this.start === this.end;
    null === (t2 = this.element) || void 0 === t2 || t2.setAttribute("part", `${e2 ? "marker" : "region"} ${this.id}`);
  }
  addResizeHandles(t2) {
    const e2 = { position: "absolute", zIndex: "2", width: "6px", height: "100%", top: "0", cursor: "ew-resize", wordBreak: "keep-all" }, i2 = n("div", { part: "region-handle region-handle-left", style: Object.assign(Object.assign({}, e2), { left: "0", borderLeft: "2px solid rgba(0, 0, 0, 0.5)", borderRadius: "2px 0 0 2px" }) }, t2), s2 = n("div", { part: "region-handle region-handle-right", style: Object.assign(Object.assign({}, e2), { right: "0", borderRight: "2px solid rgba(0, 0, 0, 0.5)", borderRadius: "0 2px 2px 0" }) }, t2), o2 = h(i2, { threshold: 1 }), l2 = h(s2, { threshold: 1 }), a2 = r(() => {
      const t3 = o2.signal.value;
      t3 && ("move" === t3.type && void 0 !== t3.deltaX ? this.onResize(t3.deltaX, "start") : "end" === t3.type && this.onEndResizing("start"));
    }, [o2.signal]), d2 = r(() => {
      const t3 = l2.signal.value;
      t3 && ("move" === t3.type && void 0 !== t3.deltaX ? this.onResize(t3.deltaX, "end") : "end" === t3.type && this.onEndResizing("end"));
    }, [l2.signal]);
    this.subscriptions.push(() => {
      a2(), d2(), o2.cleanup(), l2.cleanup();
    });
  }
  removeResizeHandles(t2) {
    const e2 = t2.querySelector('[part*="region-handle-left"]'), i2 = t2.querySelector('[part*="region-handle-right"]');
    e2 && t2.removeChild(e2), i2 && t2.removeChild(i2);
  }
  initElement() {
    if (this.isRemoved) return null;
    const t2 = this.start === this.end;
    let e2 = 0, i2 = 100;
    this.channelIdx >= 0 && this.numberOfChannels > 0 && this.channelIdx < this.numberOfChannels && (i2 = 100 / this.numberOfChannels, e2 = i2 * this.channelIdx);
    const s2 = n("div", { style: { position: "absolute", top: `${e2}%`, height: `${i2}%`, backgroundColor: t2 ? "none" : this.color, borderLeft: t2 ? "2px solid " + this.color : "none", borderRadius: "2px", boxSizing: "border-box", transition: "background-color 0.2s ease", cursor: this.drag ? "grab" : "default", pointerEvents: "all" } });
    return !t2 && this.resize && this.addResizeHandles(s2), s2;
  }
  renderPosition() {
    if (!this.element) return;
    const t2 = this.start / this.totalDuration, e2 = (this.totalDuration - this.end) / this.totalDuration;
    this.element.style.left = 100 * t2 + "%", this.element.style.right = 100 * e2 + "%";
  }
  toggleCursor(t2) {
    var e2;
    this.drag && (null === (e2 = this.element) || void 0 === e2 ? void 0 : e2.style) && (this.element.style.cursor = t2 ? "grabbing" : "grab");
  }
  initMouseEvents() {
    const { element: t2 } = this;
    if (!t2) return;
    const e2 = o(t2, "click"), i2 = o(t2, "mouseenter"), n2 = o(t2, "mouseleave"), s2 = o(t2, "dblclick"), a2 = o(t2, "pointerdown"), d2 = o(t2, "pointerup"), c = e2.subscribe((t3) => t3 && this.emit("click", t3)), u = i2.subscribe((t3) => t3 && this.emit("over", t3)), v = n2.subscribe((t3) => t3 && this.emit("leave", t3)), p = s2.subscribe((t3) => t3 && this.emit("dblclick", t3)), g = a2.subscribe((t3) => t3 && this.toggleCursor(true)), m = d2.subscribe((t3) => t3 && this.toggleCursor(false));
    this.subscriptions.push(() => {
      c(), u(), v(), p(), g(), m(), l(e2), l(i2), l(n2), l(s2), l(a2), l(d2);
    });
    const f = h(t2), b = r(() => {
      const t3 = f.signal.value;
      t3 && ("start" === t3.type ? this.toggleCursor(true) : "move" === t3.type && void 0 !== t3.deltaX ? this.onMove(t3.deltaX) : "end" === t3.type && (this.toggleCursor(false), this.drag && this.emit("update-end")));
    }, [f.signal]);
    this.subscriptions.push(() => {
      b(), f.cleanup();
    }), this.contentEditable && this.content && (this.contentClickListener = (t3) => this.onContentClick(t3), this.contentBlurListener = () => this.onContentBlur(), this.content.addEventListener("click", this.contentClickListener), this.content.addEventListener("blur", this.contentBlurListener));
  }
  _onUpdate(t2, e2, i2) {
    var n2;
    if (!(null === (n2 = this.element) || void 0 === n2 ? void 0 : n2.parentElement)) return;
    const { width: s2 } = this.element.parentElement.getBoundingClientRect(), r2 = t2 / s2 * this.totalDuration;
    let o2 = e2 && "start" !== e2 ? this.start : this.start + r2, l2 = e2 && "end" !== e2 ? this.end : this.end + r2;
    const h2 = void 0 !== i2;
    h2 && this.updatingSide && this.updatingSide !== e2 && ("start" === this.updatingSide ? o2 = i2 : l2 = i2), o2 = Math.max(0, o2), l2 = Math.min(this.totalDuration, l2);
    const a2 = l2 - o2;
    this.updatingSide = e2;
    const d2 = a2 >= this.minLength && a2 <= this.maxLength;
    o2 <= l2 && (d2 || h2) && (this.start = o2, this.end = l2, this.renderPosition(), this.emit("update", e2));
  }
  onMove(t2) {
    this.drag && this._onUpdate(t2);
  }
  onResize(t2, e2) {
    this.resize && (this.resizeStart || "start" !== e2) && (this.resizeEnd || "end" !== e2) && this._onUpdate(t2, e2);
  }
  onEndResizing(t2) {
    this.resize && (this.emit("update-end", t2), this.updatingSide = void 0);
  }
  onContentClick(t2) {
    t2.stopPropagation();
    t2.target.focus(), this.emit("click", t2);
  }
  onContentBlur() {
    this.emit("update-end");
  }
  _setTotalDuration(t2) {
    this.totalDuration = t2, this.renderPosition();
  }
  play(t2) {
    this.emit("play", t2 && this.end !== this.start ? this.end : void 0);
  }
  getContent(t2 = false) {
    var e2;
    return t2 ? this.content || void 0 : this.element instanceof HTMLElement ? (null === (e2 = this.content) || void 0 === e2 ? void 0 : e2.innerHTML) || void 0 : "";
  }
  setContent(t2) {
    var e2;
    if (this.element) if (this.content && this.contentEditable && (this.contentClickListener && this.content.removeEventListener("click", this.contentClickListener), this.contentBlurListener && this.content.removeEventListener("blur", this.contentBlurListener)), null === (e2 = this.content) || void 0 === e2 || e2.remove(), t2) {
      if ("string" == typeof t2) {
        const e3 = this.start === this.end;
        this.content = n("div", { style: { padding: `0.2em ${e3 ? 0.2 : 0.4}em`, display: "inline-block" }, textContent: t2 });
      } else this.content = t2;
      this.contentEditable && (this.content.contentEditable = "true", this.contentClickListener = (t3) => this.onContentClick(t3), this.contentBlurListener = () => this.onContentBlur(), this.content.addEventListener("click", this.contentClickListener), this.content.addEventListener("blur", this.contentBlurListener)), this.content.setAttribute("part", "region-content"), this.element.appendChild(this.content), this.emit("content-changed");
    } else this.content = void 0;
  }
  setOptions(t2) {
    var e2, i2;
    if (this.element) {
      if (t2.color && (this.color = t2.color, this.element.style.backgroundColor = this.color), void 0 !== t2.drag && (this.drag = t2.drag, this.element.style.cursor = this.drag ? "grab" : "default"), void 0 !== t2.start || void 0 !== t2.end) {
        const n2 = this.start === this.end;
        this.start = this.clampPosition(null !== (e2 = t2.start) && void 0 !== e2 ? e2 : this.start), this.end = this.clampPosition(null !== (i2 = t2.end) && void 0 !== i2 ? i2 : n2 ? this.start : this.end), this.renderPosition(), this.setPart(), this.emit("render");
      }
      if (t2.content && this.setContent(t2.content), t2.id && (this.id = t2.id, this.setPart()), void 0 !== t2.resize && t2.resize !== this.resize) {
        const e3 = this.start === this.end;
        this.resize = t2.resize, this.resize && !e3 ? this.addResizeHandles(this.element) : this.removeResizeHandles(this.element);
      }
      void 0 !== t2.resizeStart && (this.resizeStart = t2.resizeStart), void 0 !== t2.resizeEnd && (this.resizeEnd = t2.resizeEnd);
    }
  }
  remove() {
    this.isRemoved = true, this.emit("remove"), this.subscriptions.forEach((t2) => t2()), this.subscriptions = [], this.content && this.contentEditable && (this.contentClickListener && (this.content.removeEventListener("click", this.contentClickListener), this.contentClickListener = void 0), this.contentBlurListener && (this.content.removeEventListener("blur", this.contentBlurListener), this.contentBlurListener = void 0)), this.element && (this.element.remove(), this.element = null), this.unAll();
  }
}
class d extends e {
  constructor(t2) {
    super(t2), this.regions = [], this.regionsContainer = this.initRegionsContainer();
  }
  static create(t2) {
    return new d(t2);
  }
  onInit() {
    if (!this.wavesurfer) throw Error("WaveSurfer is not initialized");
    this.wavesurfer.getWrapper().appendChild(this.regionsContainer), this.subscriptions.push(this.wavesurfer.on("ready", (t3) => {
      this.regions.forEach((e2) => e2._setTotalDuration(t3));
    }));
    let t2 = [];
    this.subscriptions.push(this.wavesurfer.on("timeupdate", (e2) => {
      const i2 = this.regions.filter((t3) => t3.start <= e2 && (t3.end === t3.start ? t3.start + 0.05 : t3.end) >= e2);
      i2.forEach((e3) => {
        t2.includes(e3) || this.emit("region-in", e3);
      }), t2.forEach((t3) => {
        i2.includes(t3) || this.emit("region-out", t3);
      }), t2 = i2;
    }));
  }
  initRegionsContainer() {
    return n("div", { part: "regions-container", style: { position: "absolute", top: "0", left: "0", width: "100%", height: "100%", zIndex: "5", pointerEvents: "none" } });
  }
  getRegions() {
    return this.regions;
  }
  avoidOverlapping(t2) {
    t2.content && !t2.isRemoved && setTimeout(() => {
      const e2 = t2.content, i2 = e2.getBoundingClientRect(), n2 = this.regions.indexOf(t2), s2 = this.regions.slice(0, n2).filter((t3) => !t3.isRemoved).map((e3) => {
        if (e3 === t2 || !e3.content) return 0;
        const n3 = e3.content.getBoundingClientRect();
        return i2.left < n3.left + n3.width && n3.left < i2.left + i2.width ? n3.height + 2 : 0;
      }).reduce((t3, e3) => t3 + e3, 0);
      e2.style.marginTop = `${s2}px`;
    }, 10);
  }
  adjustScroll(t2) {
    var e2, i2;
    if (!t2.element) return;
    const n2 = null === (i2 = null === (e2 = this.wavesurfer) || void 0 === e2 ? void 0 : e2.getWrapper()) || void 0 === i2 ? void 0 : i2.parentElement;
    if (!n2) return;
    const { clientWidth: s2, scrollWidth: r2 } = n2;
    if (r2 <= s2) return;
    const o2 = n2.getBoundingClientRect(), l2 = t2.element.getBoundingClientRect(), h2 = l2.left - o2.left, a2 = l2.right - o2.left;
    h2 < 0 ? n2.scrollLeft += h2 : a2 > s2 && (n2.scrollLeft += a2 - s2);
  }
  virtualAppend(t2, e2, i2) {
    const n2 = () => {
      if (!this.wavesurfer) return;
      const n3 = this.wavesurfer.getWidth(), s2 = this.wavesurfer.getScroll(), r2 = e2.clientWidth, o2 = this.wavesurfer.getDuration(), l2 = Math.round(t2.start / o2 * r2), h2 = l2 + (Math.round((t2.end - t2.start) / o2 * r2) || 1) > s2 && l2 < s2 + n3;
      h2 && !i2.parentElement ? e2.appendChild(i2) : !h2 && i2.parentElement && i2.remove();
    };
    setTimeout(() => {
      if (!this.wavesurfer || !t2.element) return;
      n2();
      const e3 = this.wavesurfer.on("scroll", n2), i3 = this.wavesurfer.on("zoom", n2), s2 = this.wavesurfer.on("resize", n2), r2 = t2.on("render", n2);
      this.subscriptions.push(e3, i3, s2, r2), t2.once("remove", () => {
        e3(), i3(), s2(), r2();
      });
    }, 0);
  }
  saveRegion(t2) {
    if (!t2.element) return;
    this.virtualAppend(t2, this.regionsContainer, t2.element), this.avoidOverlapping(t2), this.regions.push(t2);
    const e2 = [t2.on("update", (e3) => {
      e3 || this.adjustScroll(t2), this.emit("region-update", t2, e3);
    }), t2.on("update-end", (e3) => {
      this.avoidOverlapping(t2), this.emit("region-updated", t2, e3);
    }), t2.on("play", (e3) => {
      var i2;
      null === (i2 = this.wavesurfer) || void 0 === i2 || i2.play(t2.start, e3);
    }), t2.on("click", (e3) => {
      this.emit("region-clicked", t2, e3);
    }), t2.on("dblclick", (e3) => {
      this.emit("region-double-clicked", t2, e3);
    }), t2.on("content-changed", () => {
      this.emit("region-content-changed", t2);
    }), t2.once("remove", () => {
      e2.forEach((t3) => t3()), this.regions = this.regions.filter((e3) => e3 !== t2), this.emit("region-removed", t2);
    })];
    this.subscriptions.push(...e2), this.emit("region-created", t2);
  }
  addRegion(t2) {
    var e2, i2;
    if (!this.wavesurfer) throw Error("WaveSurfer is not initialized");
    const n2 = this.wavesurfer.getDuration(), s2 = null === (i2 = null === (e2 = this.wavesurfer) || void 0 === e2 ? void 0 : e2.getDecodedData()) || void 0 === i2 ? void 0 : i2.numberOfChannels, r2 = new a(t2, n2, s2);
    return this.emit("region-initialized", r2), n2 ? this.saveRegion(r2) : this.subscriptions.push(this.wavesurfer.once("ready", (t3) => {
      r2._setTotalDuration(t3), this.saveRegion(r2);
    })), r2;
  }
  enableDragSelection(t2, e2 = 3) {
    var i2;
    const n2 = null === (i2 = this.wavesurfer) || void 0 === i2 ? void 0 : i2.getWrapper();
    if (!(n2 && n2 instanceof HTMLElement)) return () => {
    };
    let s2 = null, o2 = 0, l2 = 0;
    const d2 = h(n2, { threshold: e2 }), c = r(() => {
      var e3, i3;
      const n3 = d2.signal.value;
      if (n3) if ("start" === n3.type) {
        if (o2 = n3.x, !this.wavesurfer) return;
        const r2 = this.wavesurfer.getDuration(), h2 = null === (i3 = null === (e3 = this.wavesurfer) || void 0 === e3 ? void 0 : e3.getDecodedData()) || void 0 === i3 ? void 0 : i3.numberOfChannels, { width: d3 } = this.wavesurfer.getWrapper().getBoundingClientRect();
        l2 = o2 / d3 * r2;
        const c2 = n3.x / d3 * r2, u = (n3.x + 5) / d3 * r2;
        s2 = new a(Object.assign(Object.assign({}, t2), { start: c2, end: u }), r2, h2), this.emit("region-initialized", s2), s2.element && this.regionsContainer.appendChild(s2.element);
      } else "move" === n3.type && void 0 !== n3.deltaX ? s2 && s2._onUpdate(n3.deltaX, n3.x > o2 ? "end" : "start", l2) : "end" === n3.type && s2 && (this.saveRegion(s2), s2.updatingSide = void 0, s2 = null);
    }, [d2.signal]);
    return () => {
      c(), d2.cleanup();
    };
  }
  clearRegions() {
    this.regions.slice().forEach((t2) => t2.remove()), this.regions = [];
  }
  destroy() {
    this.clearRegions(), super.destroy(), this.regionsContainer.remove();
  }
}
function unwrapResult(result) {
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok;
}
function isStorageError(err) {
  const msg = err instanceof Error ? err.message : String(err);
  return msg.toLowerCase().includes("v3") || msg.toLowerCase().includes("certificate") || msg.toLowerCase().includes("expected v3") || msg.toLowerCase().includes("response body") || msg.toLowerCase().includes("canister is stopped") || msg.toLowerCase().includes("ic0508") || msg.toLowerCase().includes("canister stopped") || msg.toLowerCase().includes("network") || msg.toLowerCase().includes("fetch") || msg.toLowerCase().includes("failed to fetch");
}
function classifyUploadError(err) {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.toLowerCase().includes("v3") || msg.toLowerCase().includes("certificate") || msg.toLowerCase().includes("expected v3") || msg.toLowerCase().includes("response body")) {
    return "Upload temporarily unavailable — the storage service is initializing. Please try again in a moment.";
  }
  if (msg.toLowerCase().includes("canister is stopped") || msg.toLowerCase().includes("ic0508") || msg.toLowerCase().includes("canister stopped")) {
    return "The platform is restarting. Please wait a minute and try uploading again.";
  }
  if (msg.toLowerCase().includes("network") || msg.toLowerCase().includes("fetch") || msg.toLowerCase().includes("failed to fetch")) {
    return "Network error during upload. Check your connection and try again.";
  }
  return msg || "Upload failed. Please try again.";
}
const RETRY_DELAYS = [3e3, 6e3, 12e3, 2e4, 3e4];
async function withUploadRetry(fn, onWarmingUp) {
  let lastErr;
  for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (!isStorageError(err) || attempt === RETRY_DELAYS.length) break;
      if (attempt === 0 && onWarmingUp) onWarmingUp();
      await new Promise((res) => setTimeout(res, RETRY_DELAYS[attempt]));
    }
  }
  throw lastErr;
}
const GENRES = [
  "Hip-Hop",
  "R&B",
  "Pop",
  "Electronic",
  "Rock",
  "Jazz",
  "Classical",
  "Country",
  "Blues",
  "Soul",
  "Reggae",
  "Latin",
  "Metal",
  "Punk",
  "Folk",
  "Gospel",
  "EDM",
  "House",
  "Techno",
  "Drum & Bass",
  "Trap",
  "Lo-Fi",
  "Afrobeats",
  "K-Pop",
  "Indie",
  "Alternative",
  "Funk",
  "Disco",
  "Ambient",
  "New Age",
  "World Music",
  "Other"
];
const PREVIEW_DURATION = 30;
const GOLD_COLOR = "rgba(212, 175, 55, 0.35)";
const GOLD_BORDER = "rgba(212, 175, 55, 0.85)";
function emptyTrack() {
  return {
    id: crypto.randomUUID(),
    artistName: "",
    title: "",
    trackType: TrackType.single,
    genre: "",
    customGenre: "",
    price: "",
    description: "",
    releaseDate: "",
    preOrder: false,
    explicit: false,
    audioFile: null,
    coverArt: null,
    audioProgress: 0,
    coverProgress: 0,
    previewStartSecs: 0,
    previewEndSecs: PREVIEW_DURATION,
    songDetails: ""
  };
}
function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s2 = Math.floor(secs % 60);
  return `${m.toString().padStart(2, "0")}:${s2.toString().padStart(2, "0")}`;
}
function resolveGenre(genre, customGenre) {
  return genre === "Other" && customGenre.trim() ? customGenre.trim() : genre;
}
function WaveformSelector({
  audioFile,
  startSecs,
  endSecs,
  onChange,
  trackIndex
}) {
  const containerRef = reactExports.useRef(null);
  const wsRef = reactExports.useRef(null);
  const regionsRef = reactExports.useRef(
    null
  );
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [duration, setDuration] = reactExports.useState(0);
  const [localStart, setLocalStart] = reactExports.useState(startSecs);
  const [localEnd, setLocalEnd] = reactExports.useState(endSecs);
  const onChangeRef = reactExports.useRef(onChange);
  reactExports.useEffect(() => {
    onChangeRef.current = onChange;
  });
  reactExports.useEffect(() => {
    if (!containerRef.current) return;
    const regions = d.create();
    regionsRef.current = regions;
    const ws = P.create({
      container: containerRef.current,
      waveColor: "rgba(212,175,55,0.3)",
      progressColor: "rgba(212,175,55,0.75)",
      cursorColor: "#d4af37",
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 80,
      normalize: true,
      plugins: [regions]
    });
    wsRef.current = ws;
    const initialStart = startSecs;
    ws.on("ready", () => {
      var _a;
      const dur = ws.getDuration();
      setDuration(dur);
      setIsLoading(false);
      const clampedEnd = Math.min(initialStart + PREVIEW_DURATION, dur);
      const clampedStart = Math.max(0, clampedEnd - PREVIEW_DURATION);
      setLocalStart(clampedStart);
      setLocalEnd(clampedEnd);
      onChangeRef.current(clampedStart, clampedEnd);
      regions.addRegion({
        id: "preview",
        start: clampedStart,
        end: clampedEnd,
        color: GOLD_COLOR,
        drag: true,
        resize: false,
        minLength: PREVIEW_DURATION,
        maxLength: PREVIEW_DURATION
      });
      const regionEl = (_a = containerRef.current) == null ? void 0 : _a.querySelector(
        '[data-id="preview"]'
      );
      if (regionEl) {
        regionEl.style.borderLeft = `2px solid ${GOLD_BORDER}`;
        regionEl.style.borderRight = `2px solid ${GOLD_BORDER}`;
      }
    });
    ws.on("finish", () => setIsPlaying(false));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("play", () => setIsPlaying(true));
    regions.on("region-updated", (region) => {
      const dur = ws.getDuration();
      let s2 = region.start;
      let e2 = s2 + PREVIEW_DURATION;
      if (e2 > dur) {
        e2 = dur;
        s2 = Math.max(0, e2 - PREVIEW_DURATION);
      }
      region.setOptions({ start: s2, end: e2 });
      setLocalStart(s2);
      setLocalEnd(e2);
      onChangeRef.current(s2, e2);
    });
    const url = URL.createObjectURL(audioFile);
    ws.load(url).catch(() => {
      ue.error("Could not load audio for waveform preview.");
      setIsLoading(false);
    });
    return () => {
      ws.destroy();
      URL.revokeObjectURL(url);
      wsRef.current = null;
    };
  }, [audioFile, startSecs]);
  const handlePlayPreview = () => {
    const ws = wsRef.current;
    if (!ws) return;
    if (isPlaying) {
      ws.pause();
    } else {
      ws.play(localStart, localEnd);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-primary/30 bg-black/60 p-3 sm:p-4 space-y-3 w-full",
      "data-ocid": `waveform-selector-${trackIndex}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1 flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-widest", children: "30-Second Preview Window" }),
          !isLoading && duration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Track: ",
            formatTime(duration)
          ] })
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 items-end h-10", children: Array.from({ length: 20 }, (_, i2) => i2).map((i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-1 rounded-full bg-primary/30 animate-pulse",
            style: {
              height: `${20 + Math.sin(i2 * 0.8) * 14}px`,
              animationDelay: `${i2 * 0.05}s`
            }
          },
          `bar-${i2}`
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: containerRef,
            className: "rounded-lg overflow-hidden cursor-crosshair w-full",
            style: isLoading ? { position: "absolute", opacity: 0, pointerEvents: "none" } : void 0
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                onClick: handlePlayPreview,
                disabled: isLoading,
                className: "gap-1.5 border-primary/40 text-primary hover:bg-primary/10 shrink-0",
                "data-ocid": `preview-play-btn-${trackIndex}`,
                children: [
                  isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }),
                  isPlaying ? "Stop" : "Audition Preview"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground hidden sm:block", children: "Drag the gold region to choose your preview window" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground sm:hidden", children: "Drag gold region" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: formatTime(localStart) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "→" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: formatTime(localEnd) })
          ] })
        ] })
      ]
    }
  );
}
function FileDropZone({
  label,
  accept,
  maxMB,
  file,
  progress,
  icon: Icon,
  onChange,
  ocid
}) {
  const ref = reactExports.useRef(null);
  const validate = (f) => {
    if (f.size > maxMB * 1024 * 1024) {
      ue.error(`File exceeds ${maxMB} MB limit`);
      return;
    }
    onChange(f);
  };
  const dropZoneId = `dropzone-${ocid ?? "file"}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "label",
    {
      htmlFor: dropZoneId,
      className: `block border-2 border-dashed rounded-lg p-4 sm:p-5 text-center cursor-pointer transition-smooth group w-full ${file ? "border-primary/60 bg-primary/5" : "border-border hover:border-primary/40"}`,
      onDragOver: (e2) => e2.preventDefault(),
      onDrop: (e2) => {
        e2.preventDefault();
        const d2 = e2.dataTransfer.files[0];
        if (d2) validate(d2);
      },
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: dropZoneId,
            ref,
            type: "file",
            accept,
            className: "hidden",
            onChange: (e2) => {
              var _a;
              return ((_a = e2.target.files) == null ? void 0 : _a[0]) && validate(e2.target.files[0]);
            }
          }
        ),
        file ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: file.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              (file.size / (1024 * 1024)).toFixed(2),
              " MB"
            ] }),
            progress > 0 && progress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-primary transition-all duration-300",
                style: { width: `${progress}%` }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Remove file",
              className: "text-muted-foreground hover:text-destructive transition-colors-fast shrink-0 p-1",
              onClick: (e2) => {
                e2.stopPropagation();
                onChange(null);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 py-3 sm:py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-muted-foreground group-hover:text-primary transition-smooth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Tap to upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: " or drag & drop" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            label,
            " · Max ",
            maxMB,
            " MB"
          ] })
        ] })
      ]
    }
  );
}
function TrackForm({
  data,
  index,
  isAlbumMode,
  onChange,
  showRemove,
  onRemove
}) {
  const artistReceives = data.price && Number.parseFloat(data.price) > 0 ? `$${(Number.parseFloat(data.price) * 0.85).toFixed(2)}` : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `space-y-4 sm:space-y-5 ${index > 0 ? "pt-6 border-t border-border" : ""}`,
      children: [
        index > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: [
            "Track ",
            index + 1
          ] }),
          showRemove && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Remove track",
              onClick: onRemove,
              className: "text-muted-foreground hover:text-destructive transition-colors-fast p-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `artistName-${index}`, children: "Artist Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `artistName-${index}`,
                placeholder: "Your artist name",
                value: data.artistName,
                onChange: (e2) => onChange({ artistName: e2.target.value }),
                "data-ocid": `artist-name-input-${index}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `title-${index}`, children: "Track Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `title-${index}`,
                placeholder: "Track title",
                value: data.title,
                onChange: (e2) => onChange({ title: e2.target.value }),
                "data-ocid": `track-title-input-${index}`
              }
            )
          ] })
        ] }),
        !isAlbumMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Track Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6 flex-wrap", children: ["Single", "Album"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer min-h-[44px]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: `trackType-${index}`,
                    checked: type === "Single" ? data.trackType === TrackType.single : data.trackType === TrackType.album,
                    onChange: () => onChange({
                      trackType: type === "Single" ? TrackType.single : TrackType.album
                    }),
                    className: "accent-primary w-4 h-4",
                    "data-ocid": `track-type-${type.toLowerCase()}-${index}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: type })
              ]
            },
            type
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Genre" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: data.genre,
                onValueChange: (v) => onChange({
                  genre: v,
                  customGenre: v !== "Other" ? "" : data.customGenre
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": `genre-select-${index}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select genre" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "max-h-72 overflow-y-auto", children: GENRES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
                ]
              }
            ),
            data.genre === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `customGenre-${index}`,
                placeholder: "Enter your genre (e.g. Afro-Jazz, Christian Rap…)",
                value: data.customGenre,
                onChange: (e2) => onChange({ customGenre: e2.target.value }),
                className: "mt-2",
                "data-ocid": `custom-genre-input-${index}`,
                autoFocus: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `price-${index}`, children: [
              "Price (USD)",
              artistReceives && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs font-normal text-primary", children: [
                "Artist receives ",
                artistReceives
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `price-${index}`,
                type: "number",
                min: "0.01",
                step: "0.01",
                placeholder: "0.99",
                value: data.price,
                onChange: (e2) => onChange({ price: e2.target.value }),
                "data-ocid": `price-input-${index}`
              }
            ),
            !artistReceives && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Artist receives 85% of each sale" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `desc-${index}`, children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: `desc-${index}`,
              placeholder: "Tell listeners about this track...",
              rows: 3,
              value: data.description,
              onChange: (e2) => onChange({ description: e2.target.value }),
              "data-ocid": `description-input-${index}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `releaseDate-${index}`, children: "Release Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: `releaseDate-${index}`,
              type: "date",
              value: data.releaseDate,
              onChange: (e2) => onChange({ releaseDate: e2.target.value }),
              "data-ocid": `release-date-input-${index}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-h-[44px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: `preOrder-${index}`,
                checked: data.preOrder,
                onCheckedChange: (v) => onChange({ preOrder: v }),
                "data-ocid": `pre-order-toggle-${index}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `preOrder-${index}`, className: "cursor-pointer", children: "Pre-Order" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-h-[44px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: `explicit-${index}`,
                checked: data.explicit,
                onCheckedChange: (v) => onChange({ explicit: v }),
                "data-ocid": `explicit-toggle-${index}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `explicit-${index}`, className: "cursor-pointer", children: "Explicit Content" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-label", children: [
            "Audio File",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive normal-case tracking-normal font-normal text-sm", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FileDropZone,
            {
              label: "MP3 or WAV",
              accept: ".mp3,.wav,audio/mpeg,audio/wav",
              maxMB: 200,
              file: data.audioFile,
              progress: data.audioProgress,
              icon: FileAudio,
              onChange: (f) => onChange({
                audioFile: f,
                audioProgress: 0,
                previewStartSecs: 0,
                previewEndSecs: PREVIEW_DURATION
              }),
              ocid: `audio-dropzone-${index}`
            }
          )
        ] }),
        data.audioFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 w-full overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-label", children: [
            "Preview Selector",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground normal-case tracking-normal font-normal text-xs", children: "(drag gold region to choose 30s preview)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WaveformSelector,
            {
              audioFile: data.audioFile,
              startSecs: data.previewStartSecs,
              endSecs: data.previewEndSecs,
              onChange: (start, end) => onChange({ previewStartSecs: start, previewEndSecs: end }),
              trackIndex: index
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `songDetails-${index}`, children: "Song Details (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: `songDetails-${index}`,
              placeholder: "Add credits, lyrics, production notes, or anything you want fans to know",
              rows: 4,
              value: data.songDetails,
              onChange: (e2) => onChange({ songDetails: e2.target.value }),
              className: "resize-y",
              "data-ocid": `song-details-input-${index}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-label", children: [
            "Cover Art",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive normal-case tracking-normal font-normal text-sm", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FileDropZone,
            {
              label: "JPG or PNG",
              accept: ".jpg,.jpeg,.png,image/jpeg,image/png",
              maxMB: 10,
              file: data.coverArt,
              progress: data.coverProgress,
              icon: Image,
              onChange: (f) => onChange({ coverArt: f, coverProgress: 0 }),
              ocid: `cover-dropzone-${index}`
            }
          )
        ] })
      ]
    }
  );
}
function AuthGate() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 sm:py-24 gap-6 text-center animate-fade-in px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8 text-muted-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold mb-2", children: "Login required to upload music" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm", children: "Sign in to your Chosen One Productions account to release your tracks." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gap-2", "data-ocid": "upload-login-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Sign In" }) })
  ] });
}
function SuccessState({ onReset }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 sm:py-24 gap-6 text-center animate-slide-up px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center gold-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-semibold mb-2", children: "Track released! 🎵" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your music is now live on Chosen One Productions." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 w-full sm:w-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "default",
          className: "w-full sm:w-auto",
          "data-ocid": "view-dashboard-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "View in Dashboard" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onReset,
          className: "w-full sm:w-auto",
          "data-ocid": "upload-another-btn",
          children: "Upload Another"
        }
      )
    ] })
  ] });
}
function Upload() {
  const { isAuthenticated, sessionToken } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const showCrownBanner = useAppStore((s2) => s2.showCrownBanner);
  const [activeTab, setActiveTab] = reactExports.useState("single");
  const [singleTrack, setSingleTrack] = reactExports.useState(emptyTrack());
  const [albumTracks, setAlbumTracks] = reactExports.useState([
    emptyTrack()
  ]);
  const [termsAccepted, setTermsAccepted] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [storageWarmingUp, setStorageWarmingUp] = reactExports.useState(false);
  const [storageError, setStorageError] = reactExports.useState(null);
  const lastTracksRef = reactExports.useRef([]);
  const uploadMutation = useMutation({
    mutationFn: async (tracks) => {
      if (!actor) throw new Error("Not connected to backend");
      if (!sessionToken) throw new Error("Not logged in.");
      lastTracksRef.current = tracks;
      const uploadedTitles = [];
      for (let i2 = 0; i2 < tracks.length; i2++) {
        const track = tracks[i2];
        const label = track.title || `track ${i2 + 1}`;
        const finalGenre = resolveGenre(track.genre, track.customGenre);
        if (!track.artistName.trim())
          throw new Error(`Artist name required for ${label}`);
        if (!track.title.trim())
          throw new Error(`Track title required for track ${i2 + 1}`);
        if (!finalGenre) throw new Error(`Genre required for ${label}`);
        if (track.genre === "Other" && !track.customGenre.trim())
          throw new Error(`Please enter a custom genre for ${label}`);
        if (!track.price || Number.parseFloat(track.price) < 0.01)
          throw new Error(`Price must be at least $0.01 for ${label}`);
        if (!track.audioFile)
          throw new Error(`Audio file required for ${label}`);
        if (!track.coverArt) throw new Error(`Cover art required for ${label}`);
        const audioBytes = new Uint8Array(await track.audioFile.arrayBuffer());
        const audioBlob = ExternalBlob.fromBytes(audioBytes).withUploadProgress(
          (pct) => {
            if (activeTab === "single") {
              setSingleTrack((prev) => ({ ...prev, audioProgress: pct }));
            } else {
              setAlbumTracks(
                (prev) => prev.map(
                  (t2, idx) => idx === i2 ? { ...t2, audioProgress: pct } : t2
                )
              );
            }
          }
        );
        const coverBytes = new Uint8Array(await track.coverArt.arrayBuffer());
        const coverBlob = ExternalBlob.fromBytes(coverBytes).withUploadProgress(
          (pct) => {
            if (activeTab === "single") {
              setSingleTrack((prev) => ({ ...prev, coverProgress: pct }));
            } else {
              setAlbumTracks(
                (prev) => prev.map(
                  (t2, idx) => idx === i2 ? { ...t2, coverProgress: pct } : t2
                )
              );
            }
          }
        );
        const priceInCents = BigInt(
          Math.round(Number.parseFloat(track.price) * 100)
        );
        const trackId = await withUploadRetry(
          async () => {
            const uploadResult = await actor.uploadTrack(sessionToken, {
              title: track.title,
              artistName: track.artistName,
              genre: finalGenre,
              trackType: track.trackType,
              priceInCents,
              description: track.description,
              releaseDate: track.releaseDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
              explicit: track.explicit,
              preOrder: track.preOrder,
              audioFile: audioBlob,
              coverArt: coverBlob,
              previewStartSecs: track.previewStartSecs,
              previewEndSecs: track.previewEndSecs,
              songDetails: track.songDetails || void 0
            });
            return unwrapResult(uploadResult);
          },
          () => setStorageWarmingUp(true)
        );
        await withUploadRetry(
          async () => {
            const publishResult = await actor.publishTrack(
              sessionToken,
              trackId
            );
            unwrapResult(publishResult);
          },
          () => setStorageWarmingUp(true)
        );
        try {
          await actor.notifyTrackUploaded(sessionToken, track.title);
        } catch {
        }
        uploadedTitles.push(track.title);
      }
      return uploadedTitles;
    },
    onSuccess: (uploadedTitles) => {
      setStorageWarmingUp(false);
      setStorageError(null);
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["artist-tracks"] });
      queryClient.invalidateQueries({ queryKey: ["published-tracks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      const firstTitle = uploadedTitles[0] ?? "your track";
      const msg = uploadedTitles.length > 1 ? `👑 Your ${uploadedTitles.length} tracks are now live on Chosen One Distribution!` : `👑 "${firstTitle}" is now live on Chosen One Distribution!`;
      showCrownBanner(msg);
    },
    onError: (err) => {
      setStorageWarmingUp(false);
      if (isStorageError(err)) {
        setStorageError(err);
      } else {
        setStorageError(null);
        ue.error(classifyUploadError(err));
      }
    }
  });
  const handleSubmit = (e2) => {
    e2.preventDefault();
    if (!termsAccepted) {
      ue.error("Please accept the Terms of Service to continue.");
      return;
    }
    setStorageWarmingUp(false);
    setStorageError(null);
    const tracks = activeTab === "single" ? [singleTrack] : albumTracks;
    uploadMutation.mutate(tracks);
  };
  const patchAlbumTrack = (i2, patch) => {
    setAlbumTracks(
      (prev) => prev.map((t2, idx) => idx === i2 ? { ...t2, ...patch } : t2)
    );
  };
  const handleReset = () => {
    setSingleTrack(emptyTrack());
    setAlbumTracks([emptyTrack()]);
    setTermsAccepted(false);
    setSuccess(false);
    setStorageWarmingUp(false);
    setStorageError(null);
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGate, {}) });
  }
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessState, { onReset: handleReset }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 py-8 sm:py-10 animate-fade-in",
      "data-ocid": "upload-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl sm:text-3xl", children: "🎵" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-display font-bold", children: "Release Your Track" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm sm:text-base", children: [
            "Distribute your music worldwide. Artists receive",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "85%" }),
            " of every sale."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Tabs,
          {
            value: activeTab,
            onValueChange: setActiveTab,
            "data-ocid": "upload-tabs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-5 sm:mb-6 w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabsTrigger,
                  {
                    value: "single",
                    className: "flex-1 text-xs sm:text-sm",
                    "data-ocid": "tab-single",
                    children: "Single Upload"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "album",
                    className: "flex-1 text-xs sm:text-sm",
                    "data-ocid": "tab-album",
                    children: [
                      "Album Upload",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "ml-1.5 text-xs hidden sm:inline-flex",
                          children: "up to 10"
                        }
                      )
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "single", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated p-4 sm:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TrackForm,
                  {
                    data: singleTrack,
                    index: 0,
                    isAlbumMode: false,
                    onChange: (patch) => setSingleTrack((prev) => ({ ...prev, ...patch })),
                    showRemove: false,
                    onRemove: () => {
                    }
                  }
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "album", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 sm:p-6 overflow-y-auto max-h-[70vh] sm:max-h-none", children: [
                  albumTracks.map((track, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TrackForm,
                    {
                      data: track,
                      index: i2,
                      isAlbumMode: true,
                      onChange: (patch) => patchAlbumTrack(i2, patch),
                      showRemove: albumTracks.length > 1,
                      onRemove: () => setAlbumTracks((prev) => prev.filter((_, idx) => idx !== i2))
                    },
                    track.id
                  )),
                  albumTracks.length < 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setAlbumTracks((prev) => [...prev, emptyTrack()]),
                      className: "mt-6 w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-primary transition-smooth min-h-[52px]",
                      "data-ocid": "add-track-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                        "Add Another Track (",
                        albumTracks.length,
                        "/10)"
                      ]
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 sm:mt-6 card-elevated p-4 sm:p-6 space-y-4 sm:space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "flex items-start gap-3 cursor-pointer group",
                      "data-ocid": "terms-checkbox",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: termsAccepted,
                            onChange: (e2) => setTermsAccepted(e2.target.checked),
                            className: "mt-0.5 accent-primary w-4 h-4 shrink-0"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground group-hover:text-foreground transition-colors-fast", children: [
                          "I agree to the",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary underline underline-offset-2", children: "Terms of Service" }),
                          " ",
                          "and confirm I own the rights to this content."
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: uploadMutation.isPending || !termsAccepted,
                      className: "w-full gap-2 h-12 text-base font-semibold",
                      "data-ocid": "release-now-btn",
                      children: uploadMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin inline-block", children: "⏳" }),
                        "Uploading & Publishing…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload$1, { className: "w-5 h-5" }),
                        "Release Now"
                      ] })
                    }
                  ),
                  uploadMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center animate-pulse", children: storageWarmingUp ? "⚡ Storage is warming up, please wait — this may take up to a minute…" : "Uploading your files — this may take a moment for large audio files…" }),
                  storageError && !uploadMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3",
                      "data-ocid": "storage-error-banner",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Upload temporarily unavailable — the storage service is initializing. Please try again in a moment." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            className: "gap-2 border-primary/50 text-primary hover:bg-primary/10",
                            onClick: () => {
                              setStorageError(null);
                              setStorageWarmingUp(false);
                              uploadMutation.mutate(lastTracksRef.current);
                            },
                            "data-ocid": "storage-retry-btn",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload$1, { className: "w-4 h-4" }),
                              "Try Again"
                            ]
                          }
                        )
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  Upload as default
};
