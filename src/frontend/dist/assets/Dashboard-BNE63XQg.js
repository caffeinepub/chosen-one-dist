import { t as createLucideIcon, r as reactExports, j as jsxRuntimeExports, w as useComposedRefs, x as cn, y as buttonVariants, X, u as useTranslation, d as useAuth, c as useActor, g as useQueryClient, h as useNavigate, k as useAppStore, e as useQuery, a as ChartNoAxesColumn, B as Button, L as Link, z as DollarSign, I as Input, U as Upload, T as TrackType, D as Download, l as ue, A as hashPin, F as TrackState, f as createActor } from "./index-DwqYJl65.js";
import { u as useControllableState, e as useId, P as Primitive, c as composeEventHandlers, m as createContext2, n as Portal$1, o as hideOthers, d as createContextScope, R as ReactRemoveScroll, p as useFocusGuards, F as FocusScope, D as DismissableLayer, q as createSlot, r as createSlottable, a as usePrevious, b as useSize, C as Check, S as Select, i as SelectTrigger, j as SelectValue, k as SelectContent, l as SelectItem } from "./select-BKIUF9g3.js";
import { P as Presence } from "./index-CMeFP2U8.js";
import { B as Badge } from "./badge-B4QsRaw5.js";
import { L as Label } from "./label-ezFZS5E4.js";
import { S as Skeleton, T as TrendingUp } from "./skeleton-C6ZgmgEx.js";
import { T as Textarea } from "./textarea-DqPdeuYn.js";
import { u as useMutation } from "./useMutation-D0FQjNJQ.js";
import { E as Eye } from "./eye-DhqReN6U.js";
import { M as Music } from "./music-BtP5PwN1.js";
import { R as RefreshCw } from "./refresh-cw-BWJu9X5n.js";
import { T as Trash2 } from "./trash-2-BPWfsWRk.js";
import { K as KeyRound } from "./key-round-BgBfpUaN.js";
import { T as Trophy, F as FileText } from "./trophy-BRTko9Ud.js";
import { G as Globe } from "./globe-Bo6cPlix.js";
import { S as Share2 } from "./share-2-ChRADllk.js";
import "./chevron-up-BLicL1OL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3", key: "mhlwft" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const ShieldQuestion = createLucideIcon("shield-question", __iconNode);
var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME$2 = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME$2, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState$1(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME$2;
var PORTAL_NAME$1 = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME$1, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME$1, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME$1;
var OVERLAY_NAME$1 = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME$1, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME$1, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME$1;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME$1, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState$1(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME$1 = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME$1;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME$1, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState$1(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning$1, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME$1 = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME$1, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME$1;
var DESCRIPTION_NAME$1 = "DialogDescription";
var DialogDescription = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME$1, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription.displayName = DESCRIPTION_NAME$1;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState$1(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME$1,
  titleName: TITLE_NAME$1,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning$1 = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    var _a;
    const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog$1;
var Trigger = DialogTrigger;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content = DialogContent$1;
var Title = DialogTitle$1;
var Description = DialogDescription;
var Close = DialogClose;
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME$1 = "AlertDialogTrigger";
var AlertDialogTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger$1.displayName = TRIGGER_NAME$1;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger2, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was the name of your first school?",
  "What is the name of your favorite childhood friend?",
  "What street did you grow up on?",
  "What was your childhood nickname?",
  "What is your oldest sibling's middle name?",
  "What was the make of your first car?",
  "What is your favorite movie?"
];
const ALL_GENRES = [
  "Hip-Hop",
  "R&B / Soul",
  "Pop",
  "Electronic / Dance",
  "Rock",
  "Metal",
  "Jazz",
  "Blues",
  "Classical",
  "Country",
  "Reggae",
  "Latin",
  "Gospel / Christian",
  "Afrobeats",
  "Trap",
  "Lo-Fi",
  "Drill",
  "House",
  "Techno",
  "Ambient",
  "Folk / Acoustic",
  "Punk",
  "Indie",
  "Ska",
  "Funk",
  "World",
  "Other"
];
const CROWN_SESSION_KEY = "crown-welcome-shown";
function unwrapResult(result) {
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok;
}
function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `card-elevated p-4 sm:p-5 ${highlight ? "border border-primary/30" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2 sm:mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground leading-tight pr-2", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center shrink-0 ${highlight ? "bg-primary/25" : "bg-primary/15"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl sm:text-2xl text-foreground", children: value }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
      ]
    }
  );
}
function TopTrackCard({ track }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 sm:p-5 flex items-center gap-3 sm:gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 sm:w-6 sm:h-6 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground mb-0.5", children: "Top Track" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground truncate", children: track.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
        Number(track.saleCount).toLocaleString(),
        " sales ·",
        " ",
        Number(track.previewCount).toLocaleString(),
        " previews · ",
        track.genre
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "shrink-0 capitalize text-xs", children: track.trackType === TrackType.album ? "Album" : "Single" })
  ] });
}
function EditTrackModal({
  track,
  open,
  onClose,
  onSave,
  isPending
}) {
  const { t } = useTranslation();
  const isOtherGenre = !ALL_GENRES.slice(0, -1).includes(track.genre);
  const [form, setForm] = reactExports.useState({
    title: track.title,
    genre: isOtherGenre ? "Other" : track.genre,
    customGenre: isOtherGenre ? track.genre : "",
    priceInCents: String(Number(track.priceInCents)),
    description: "",
    releaseDate: track.releaseDate ?? "",
    explicit: false,
    preOrder: track.state === TrackState.preOrder,
    previewStartSecs: "",
    previewEndSecs: "",
    songDetails: ""
  });
  function setField(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "w-full max-w-lg mx-auto max-h-[92dvh] overflow-y-auto rounded-t-2xl sm:rounded-lg bottom-0 sm:bottom-auto fixed sm:relative inset-x-0 sm:inset-auto",
      "data-ocid": "edit-track-modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4 text-primary" }),
          t("editTrack"),
          ": ",
          track.title
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-title", children: t("trackTitle") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-title",
                value: form.title,
                onChange: (e) => setField("title", e.target.value),
                "data-ocid": "edit-track-title"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("genre") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.genre,
                onValueChange: (v) => setField("genre", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "edit-track-genre", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select genre" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ALL_GENRES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
                ]
              }
            ),
            form.genre === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Enter custom genre",
                value: form.customGenre,
                onChange: (e) => setField("customGenre", e.target.value),
                className: "mt-2",
                "data-ocid": "edit-track-custom-genre"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-price", children: t("price") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "$" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-price",
                  className: "pl-7",
                  value: form.priceInCents === "" ? "" : String(Number(form.priceInCents) / 100),
                  onChange: (e) => {
                    const dollars = Number.parseFloat(e.target.value);
                    setField(
                      "priceInCents",
                      Number.isNaN(dollars) ? "0" : String(Math.round(dollars * 100))
                    );
                  },
                  type: "number",
                  min: "0",
                  step: "0.01",
                  placeholder: "0.99",
                  "data-ocid": "edit-track-price"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-description", children: t("description") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "edit-description",
                value: form.description,
                onChange: (e) => setField("description", e.target.value),
                placeholder: "Describe this track...",
                rows: 3,
                "data-ocid": "edit-track-description"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-song-details", children: t("songDetails") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "edit-song-details",
                value: form.songDetails,
                onChange: (e) => setField("songDetails", e.target.value),
                placeholder: "Credits, lyrics, production notes... (optional)",
                rows: 2,
                "data-ocid": "edit-track-song-details"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-release-date", children: t("releaseDate") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-release-date",
                type: "date",
                value: form.releaseDate,
                onChange: (e) => setField("releaseDate", e.target.value),
                "data-ocid": "edit-track-release-date"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-preview-start", children: "Preview Window (seconds)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Start" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "edit-preview-start",
                    type: "number",
                    min: "0",
                    step: "1",
                    placeholder: "e.g. 30",
                    value: form.previewStartSecs,
                    onChange: (e) => setField("previewStartSecs", e.target.value),
                    "data-ocid": "edit-track-preview-start"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "End" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "edit-preview-end",
                    type: "number",
                    min: "0",
                    step: "1",
                    placeholder: "e.g. 60",
                    value: form.previewEndSecs,
                    onChange: (e) => setField("previewEndSecs", e.target.value),
                    "data-ocid": "edit-track-preview-end"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Leave blank to keep current preview times" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 sm:gap-6 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: "edit-explicit",
                  checked: form.explicit,
                  onCheckedChange: (v) => setField("explicit", !!v),
                  "data-ocid": "edit-track-explicit"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "edit-explicit",
                  className: "cursor-pointer text-sm font-normal",
                  children: t("explicit")
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: "edit-preorder",
                  checked: form.preOrder,
                  onCheckedChange: (v) => setField("preOrder", !!v),
                  "data-ocid": "edit-track-preorder"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "edit-preorder",
                  className: "cursor-pointer text-sm font-normal",
                  children: t("preOrder")
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                disabled: isPending,
                "data-ocid": "edit-track-cancel",
                children: t("cancel")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90",
                disabled: isPending || !form.title.trim(),
                onClick: () => onSave(track.id, form),
                "data-ocid": "edit-track-save",
                children: isPending ? "Saving…" : t("save")
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function DownloadReportSection({
  entries,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated overflow-hidden mb-8",
      "data-ocid": "dashboard-download-report",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 sm:px-6 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Download Report" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs ml-auto", children: [
            entries.length,
            " entries"
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 sm:p-6 space-y-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center py-12 text-center text-muted-foreground px-4",
            "data-ocid": "download-report-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 opacity-30 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No purchase records yet. Sales will appear here once customers buy your tracks." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden divide-y divide-border", children: entries.map((entry) => {
            const purchasedDate = new Date(
              Number(entry.purchasedAt) / 1e6
            );
            const isExpired = !entry.downloadAvailable;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-4 space-y-1.5",
                "data-ocid": `report-row-${entry.saleId}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: entry.trackTitle }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: isExpired ? "destructive" : "secondary",
                        className: "text-xs shrink-0",
                        children: isExpired ? "Expired" : "Active"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs uppercase font-mono",
                        children: entry.format
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: purchasedDate.toLocaleDateString() })
                  ] })
                ]
              },
              String(entry.saleId)
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Track" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Format" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Customer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Purchased" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Expires" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-6 py-3 font-medium", children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: entries.map((entry) => {
              const purchasedDate = new Date(
                Number(entry.purchasedAt) / 1e6
              );
              const expiresDate = new Date(
                Number(entry.expiresAt) / 1e6
              );
              const isExpired = !entry.downloadAvailable;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-secondary/40 transition-colors",
                  "data-ocid": `report-row-${entry.saleId}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-40", children: entry.trackTitle }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs uppercase font-mono",
                        children: entry.format
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs truncate max-w-32", children: entry.artistName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: purchasedDate.toLocaleDateString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: expiresDate.toLocaleDateString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: isExpired ? "destructive" : "secondary",
                        className: "text-xs",
                        children: isExpired ? "Expired" : "Active"
                      }
                    ) })
                  ]
                },
                String(entry.saleId)
              );
            }) })
          ] }) })
        ] })
      ]
    }
  );
}
const SOCIAL_FIELDS = [
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "instagram.com/yourhandle",
    icon: Share2
  },
  {
    key: "twitterX",
    label: "Twitter / X",
    placeholder: "twitter.com/yourhandle",
    icon: Share2
  },
  {
    key: "tiktok",
    label: "TikTok",
    placeholder: "tiktok.com/@yourhandle",
    icon: Music
  },
  {
    key: "youtube",
    label: "YouTube",
    placeholder: "youtube.com/@yourchannel",
    icon: TrendingUp
  },
  {
    key: "facebook",
    label: "Facebook",
    placeholder: "facebook.com/yourpage",
    icon: Share2
  },
  {
    key: "soundcloud",
    label: "SoundCloud",
    placeholder: "soundcloud.com/yourprofile",
    icon: Music
  },
  {
    key: "spotify",
    label: "Spotify",
    placeholder: "open.spotify.com/artist/...",
    icon: Music
  },
  {
    key: "appleMusic",
    label: "Apple Music",
    placeholder: "music.apple.com/...",
    icon: Music
  },
  {
    key: "website",
    label: "Website",
    placeholder: "yourwebsite.com",
    icon: Globe
  }
];
function SocialLinksEditor({
  actor,
  sessionToken,
  profileId,
  queryClient
}) {
  const [links, setLinks] = reactExports.useState({});
  const [loaded, setLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor || !profileId || loaded) return;
    actor.getArtistProfile(profileId).then((result) => {
      if (result.__kind__ === "ok") {
        const p = result.ok;
        const extracted = {};
        if (p.instagram) extracted.instagram = p.instagram;
        if (p.twitterX) extracted.twitterX = p.twitterX;
        if (p.tiktok) extracted.tiktok = p.tiktok;
        if (p.youtube) extracted.youtube = p.youtube;
        if (p.facebook) extracted.facebook = p.facebook;
        if (p.soundcloud) extracted.soundcloud = p.soundcloud;
        if (p.spotify) extracted.spotify = p.spotify;
        if (p.appleMusic) extracted.appleMusic = p.appleMusic;
        if (p.website) extracted.website = p.website;
        if (Object.keys(extracted).length > 0) setLinks(extracted);
      }
    }).catch(() => {
    }).finally(() => setLoaded(true));
  }, [actor, profileId, loaded]);
  const saveMutation = useMutation({
    mutationFn: async () => {
      const result = await actor.updateArtistSocialLinks(sessionToken, links);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artist-public-profile", profileId]
      });
      ue.success("Social links saved! 🌐");
    },
    onError: (err) => ue.error(err.message || "Failed to save social links.")
  });
  const setLink = (key, value) => {
    setLinks((prev) => ({ ...prev, [key]: value || void 0 }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated p-4 sm:p-6 mb-8",
      "data-ocid": "dashboard-social-links",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Social Media Links" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Add your social media profiles so fans can find you everywhere." }),
        !loaded ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: SOCIAL_FIELDS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full rounded-md" }, f.key)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: SOCIAL_FIELDS.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: `social-${field.key}`,
              className: "text-primary/90 text-xs font-semibold uppercase tracking-wide",
              children: field.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs select-none", children: "🔗" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `social-${field.key}`,
                className: "pl-8 bg-secondary/30 border-border focus:border-primary/50 text-sm",
                placeholder: field.placeholder,
                value: links[field.key] ?? "",
                onChange: (e) => setLink(field.key, e.target.value),
                "data-ocid": `social-input-${field.key}`
              }
            )
          ] })
        ] }, field.key)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            className: "mt-5 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto",
            disabled: saveMutation.isPending || !loaded,
            onClick: () => saveMutation.mutate(),
            "data-ocid": "social-links-save",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
              saveMutation.isPending ? "Saving…" : "Save Social Links"
            ]
          }
        )
      ]
    }
  );
}
function SecurityQuestionSection({
  actor,
  sessionToken,
  artistName
}) {
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [selectedQuestion, setSelectedQuestion] = reactExports.useState("");
  const [answer, setAnswer] = reactExports.useState("");
  const {
    data: currentQuestion,
    isLoading: questionLoading,
    refetch
  } = useQuery({
    queryKey: ["artist-security-question", artistName],
    queryFn: async () => {
      const result = await actor.getArtistSecurityQuestion(artistName);
      return result ?? null;
    },
    enabled: !!actor && !!artistName
  });
  const saveMutation = useMutation({
    mutationFn: async ({
      question,
      answerRaw
    }) => {
      const normalized = answerRaw.trim().toLowerCase();
      const encoder = new TextEncoder();
      const data = encoder.encode(normalized);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const answerHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      const result = await actor.setArtistSecurityQuestion(
        sessionToken,
        question,
        answerHash
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      ue.success("Security question saved! 🔒");
      setIsEditing(false);
      setSelectedQuestion("");
      setAnswer("");
      refetch();
    },
    onError: (err) => ue.error(err.message || "Failed to save security question.")
  });
  const removeMutation = useMutation({
    mutationFn: async () => {
      const result = await actor.setArtistSecurityQuestion(
        sessionToken,
        "",
        ""
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      ue.success("Security question removed.");
      refetch();
    },
    onError: (err) => ue.error(err.message || "Failed to remove security question.")
  });
  const hasQuestion = !!currentQuestion && currentQuestion.trim().length > 0;
  const canSubmit = selectedQuestion && answer.trim().length >= 2 && !saveMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated p-4 sm:p-6 mb-8",
      "data-ocid": "dashboard-security-question",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldQuestion, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Security Question" })
          ] }),
          !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "ghost",
              onClick: () => {
                setIsEditing(true);
                setSelectedQuestion(hasQuestion ? currentQuestion : "");
                setAnswer("");
              },
              "data-ocid": "dashboard-security-question-toggle",
              children: hasQuestion ? "Update" : "Set Question"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "ghost",
              onClick: () => {
                setIsEditing(false);
                setSelectedQuestion("");
                setAnswer("");
              },
              children: "Cancel"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "A security question helps the admin verify your identity for a PIN reset if you ever get locked out." }),
        questionLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full rounded-md" }) : !isEditing ? hasQuestion ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-primary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4 text-primary shrink-0 mt-0.5 sm:mt-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground flex-1 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-medium uppercase tracking-wide block mb-0.5", children: "Current Question" }),
            currentQuestion
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "ghost",
                className: "text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 w-full sm:w-auto",
                disabled: removeMutation.isPending,
                "data-ocid": "dashboard-security-question-remove",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 mr-1.5" }),
                  "Remove"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remove Security Question" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Removing your security question means you may not be able to verify your identity for a PIN reset. Are you sure?" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    onClick: () => removeMutation.mutate(),
                    disabled: removeMutation.isPending,
                    "data-ocid": "dashboard-security-question-remove-confirm",
                    children: "Remove Question"
                  }
                )
              ] })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-secondary/20 rounded-lg border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldQuestion, { className: "w-4 h-4 text-muted-foreground shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No security question set." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-0.5", children: "Setting one gives the admin a way to verify you during a PIN reset." })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border-t border-border pt-4 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "security-question-select", children: "Question" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: selectedQuestion,
                onValueChange: setSelectedQuestion,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "security-question-select",
                      "data-ocid": "security-question-select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a security question…" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SECURITY_QUESTIONS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: q, children: q }, q)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "security-question-answer", children: "Answer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "security-question-answer",
                type: "text",
                placeholder: "Your answer (case-insensitive)",
                value: answer,
                onChange: (e) => setAnswer(e.target.value),
                disabled: saveMutation.isPending,
                "data-ocid": "security-question-answer"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Answers are stored securely — only you know the plaintext." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              disabled: !canSubmit,
              onClick: () => saveMutation.mutate({
                question: selectedQuestion,
                answerRaw: answer
              }),
              className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto",
              "data-ocid": "security-question-save",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                saveMutation.isPending ? "Saving…" : "Save Security Question"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function RegisterForm({
  onRegister
}) {
  const [name, setName] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-md mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center",
      "data-ocid": "dashboard-register-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl block mb-4", children: "👑" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Create Your Artist Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 text-sm", children: "Set up your profile to start distributing music on Chosen One Productions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 sm:p-6 text-left space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-name", children: "Artist / Stage Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "reg-name",
                placeholder: "e.g. DJ Chosen One",
                value: name,
                onChange: (e) => setName(e.target.value),
                "data-ocid": "dashboard-register-name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-bio", children: "Bio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "reg-bio",
                placeholder: "Tell fans about yourself…",
                value: bio,
                onChange: (e) => setBio(e.target.value),
                rows: 3,
                "data-ocid": "dashboard-register-bio"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
              disabled: !name.trim(),
              onClick: () => onRegister(name.trim(), bio.trim()),
              "data-ocid": "dashboard-register-submit",
              children: "Create Profile"
            }
          )
        ] })
      ]
    }
  );
}
function TrackMobileCard({
  track,
  onEdit,
  onDelete,
  deletePending,
  t
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "p-4 border-b border-border last:border-0",
      "data-ocid": `dashboard-track-card-${track.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-md bg-secondary flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: track.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: track.genre }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground capitalize", children: track.trackType === TrackType.album ? "Album" : "Single" }),
            track.releaseDate && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: track.releaseDate })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3 inline mr-0.5" }),
              Number(track.previewCount).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 inline mr-0.5" }),
              Number(track.saleCount).toLocaleString(),
              " sales"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "w-11 h-11 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors",
              onClick: onEdit,
              "aria-label": `Edit ${track.title}`,
              "data-ocid": `dashboard-edit-${track.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-11 h-11 flex items-center justify-center rounded-md text-destructive hover:bg-destructive/10 transition-colors",
                "aria-label": `Delete ${track.title}`,
                "data-ocid": `dashboard-delete-${track.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Track" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "Delete",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: track.title }),
                  "? This removes it from the store permanently."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: t("cancel") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    onClick: onDelete,
                    disabled: deletePending,
                    "data-ocid": `dashboard-delete-confirm-${track.id}`,
                    children: t("deleteTrack")
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function Dashboard() {
  const { t } = useTranslation();
  const { isAuthenticated, changePIN, sessionToken, artistName } = useAuth();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showCrownBanner } = useAppStore();
  reactExports.useEffect(() => {
    if (!isAuthenticated || !artistName) return;
    const alreadyShown = sessionStorage.getItem(CROWN_SESSION_KEY);
    if (alreadyShown) return;
    sessionStorage.setItem(CROWN_SESSION_KEY, "1");
    const timer = setTimeout(() => {
      showCrownBanner(`${t("welcomeBack")} 👑 ${artistName}`);
    }, 600);
    return () => clearTimeout(timer);
  }, [isAuthenticated, artistName, showCrownBanner, t]);
  const [editingName, setEditingName] = reactExports.useState(false);
  const [nameInput, setNameInput] = reactExports.useState("");
  const [showChangePIN, setShowChangePIN] = reactExports.useState(false);
  const [currentPIN, setCurrentPIN] = reactExports.useState("");
  const [newPIN, setNewPIN] = reactExports.useState("");
  const [confirmNewPIN, setConfirmNewPIN] = reactExports.useState("");
  const [pinPending, setPinPending] = reactExports.useState(false);
  const [editingTrack, setEditingTrack] = reactExports.useState(
    null
  );
  const [showReport, setShowReport] = reactExports.useState(false);
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["my-artist-profile"],
    queryFn: async () => {
      const result = await actor.getMyArtistProfile(sessionToken);
      return result ?? null;
    },
    enabled: !!actor && !actorFetching && isAuthenticated && !!sessionToken
  });
  const { data: rtStats, isLoading: rtStatsLoading } = useQuery({
    queryKey: ["rt-dashboard-stats"],
    queryFn: async () => {
      const result = await actor.getRealTimeDashboardStats(sessionToken);
      return unwrapResult(result);
    },
    enabled: !!actor && !actorFetching && isAuthenticated && !!profile && !!sessionToken,
    refetchInterval: 3e4
  });
  const { data: tracks, isLoading: tracksLoading } = useQuery({
    queryKey: ["artist-tracks"],
    queryFn: async () => {
      const result = await actor.getArtistTracks(sessionToken);
      return unwrapResult(result);
    },
    enabled: !!actor && !actorFetching && isAuthenticated && !!profile && !!sessionToken
  });
  const { data: reportEntries, isLoading: reportLoading } = useQuery({
    queryKey: ["download-report"],
    queryFn: async () => {
      const result = await actor.getDownloadReport(sessionToken);
      return unwrapResult(result);
    },
    enabled: !!actor && !actorFetching && isAuthenticated && !!sessionToken && showReport
  });
  const registerMutation = useMutation({
    mutationFn: async ({ name, bio }) => {
      const result = await actor.updateArtistProfile(sessionToken, name, bio);
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-artist-profile"] });
      ue.success("Artist profile created! Welcome 👑");
    },
    onError: (err) => ue.error(err.message || "Failed to create profile.")
  });
  const updateProfileMutation = useMutation({
    mutationFn: async ({ name, bio }) => {
      const result = await actor.updateArtistProfile(sessionToken, name, bio);
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-artist-profile"] });
      ue.success("Profile updated! 🎵");
      setEditingName(false);
    },
    onError: (err) => ue.error(err.message || "Failed to update profile.")
  });
  const editTrackMutation = useMutation({
    mutationFn: async ({
      trackId,
      form
    }) => {
      const effectiveGenre = form.genre === "Other" ? form.customGenre.trim() || "Other" : form.genre;
      const result = await actor.updateTrackMetadata(
        sessionToken,
        trackId,
        form.title.trim(),
        effectiveGenre,
        BigInt(form.priceInCents || "0"),
        form.description,
        form.releaseDate,
        form.explicit,
        form.preOrder,
        form.previewStartSecs ? Number.parseFloat(form.previewStartSecs) : null,
        form.previewEndSecs ? Number.parseFloat(form.previewEndSecs) : null,
        form.songDetails || null
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artist-tracks"] });
      ue.success("Track updated! 🎵");
      setEditingTrack(null);
    },
    onError: (err) => ue.error(err.message || "Failed to update track.")
  });
  const deleteMutation = useMutation({
    mutationFn: async (trackId) => {
      const result = await actor.deleteTrack(sessionToken, trackId);
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artist-tracks"] });
      queryClient.invalidateQueries({ queryKey: ["rt-dashboard-stats"] });
      ue.success("Track deleted.");
    },
    onError: (err) => ue.error(err.message || "Failed to delete track.")
  });
  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      const result = await actor.deleteArtistAccount(sessionToken);
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.clear();
      ue.success("Account deleted.");
      navigate({ to: "/" });
    },
    onError: (err) => ue.error(err.message || "Failed to delete account.")
  });
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center",
        "data-ocid": "dashboard-auth-gate",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-16 h-16 text-muted-foreground/40 mx-auto mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-3", children: t("dashboardTitle") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Sign in to access your dashboard and manage your music." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "bg-primary text-primary-foreground hover:bg-primary/90",
              "data-ocid": "dashboard-login-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Sign In" })
            }
          )
        ]
      }
    );
  }
  if (profileLoading || actorFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" })
      ] }, i)) })
    ] });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RegisterForm,
      {
        onRegister: (name, bio) => registerMutation.mutate({ name, bio })
      }
    );
  }
  const grossUSD = rtStats ? `$${(Number(rtStats.grossRevenue) / 100).toFixed(2)}` : "$0.00";
  const payoutUSD = rtStats ? `$${(Number(rtStats.artistPayout) / 100).toFixed(2)}` : "$0.00";
  const STAT_CARDS = [
    {
      label: t("trackPreviews"),
      value: rtStats ? Number(rtStats.trackPreviews).toLocaleString() : "—",
      icon: Eye
    },
    {
      label: t("totalListens"),
      value: rtStats ? Number(rtStats.totalListens).toLocaleString() : "—",
      icon: Music
    },
    {
      label: t("totalSales"),
      value: rtStats ? Number(rtStats.totalSales).toLocaleString() : "—",
      icon: TrendingUp,
      sub: "Units sold"
    },
    {
      label: t("grossRevenue"),
      value: grossUSD,
      icon: DollarSign,
      sub: "Before split"
    },
    {
      label: t("yourPayout"),
      value: payoutUSD,
      icon: DollarSign,
      sub: "85% royalty share",
      highlight: true
    }
  ];
  const topTrack = tracks && tracks.length > 0 ? tracks.reduce((best, tr) => tr.saleCount > best.saleCount ? tr : best) : null;
  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    updateProfileMutation.mutate({ name: nameInput.trim(), bio: profile.bio });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10",
      "data-ocid": "dashboard-page",
      children: [
        editingTrack && /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditTrackModal,
          {
            track: editingTrack,
            open: !!editingTrack,
            onClose: () => setEditingTrack(null),
            onSave: (trackId, form) => editTrackMutation.mutate({ trackId, form }),
            isPending: editTrackMutation.isPending
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-1", children: [
              t("welcomeBack"),
              " 👑"
            ] }),
            editingName ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: nameInput,
                  onChange: (e) => setNameInput(e.target.value),
                  className: "h-9 text-lg font-display font-bold w-full sm:w-64",
                  onKeyDown: (e) => {
                    if (e.key === "Enter") handleSaveName();
                    if (e.key === "Escape") setEditingName(false);
                  },
                  autoFocus: true,
                  "data-ocid": "dashboard-name-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "h-9 w-9 p-0 text-primary hover:text-primary shrink-0",
                  onClick: handleSaveName,
                  disabled: updateProfileMutation.isPending,
                  "aria-label": "Save name",
                  "data-ocid": "dashboard-name-save",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "h-9 w-9 p-0 shrink-0",
                  onClick: () => setEditingName(false),
                  "aria-label": "Cancel",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground", children: profile.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary p-1 rounded min-h-[44px] min-w-[44px] flex items-center justify-center sm:min-h-0 sm:min-w-0",
                  onClick: () => {
                    setNameInput(profile.name);
                    setEditingName(true);
                  },
                  "aria-label": "Edit artist name",
                  "data-ocid": "dashboard-name-edit-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            rtStatsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Updating…" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/upload", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
                "data-ocid": "dashboard-upload-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline", children: [
                    t("upload"),
                    " Music"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Upload" })
                ]
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3 sm:mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: [
            t("realTimeStats"),
            " · auto-refreshes every 30s"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8", children: rtStatsLoading && !rtStats ? Array.from({ length: 5 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-14" })
        ] }, i)) : STAT_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...card }, card.label)) }),
        topTrack && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 sm:mb-8", "data-ocid": "dashboard-top-track", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TopTrackCard, { track: topTrack }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated overflow-hidden mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4 text-primary" }),
              t("tracks")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
              (tracks == null ? void 0 : tracks.length) ?? 0,
              " tracks"
            ] })
          ] }),
          tracksLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 sm:p-6 space-y-4", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-md shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16 rounded-full" })
          ] }, i)) }) : !tracks || tracks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4",
              "data-ocid": "dashboard-empty-tracks",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-12 h-12 text-muted-foreground/40 mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: t("noTracks2") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Upload your first track to reach fans worldwide." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/upload", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
                    "data-ocid": "dashboard-upload-first-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                      "Upload Music"
                    ]
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden", children: tracks.map((track) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              TrackMobileCard,
              {
                track,
                onEdit: () => setEditingTrack(track),
                onDelete: () => deleteMutation.mutate(track.id),
                deletePending: deleteMutation.isPending,
                t
              },
              String(track.id)
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Genre" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Release Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Previews" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Sales" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-6 py-3 font-medium", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: tracks.map((track) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-secondary/50 transition-colors duration-150",
                  "data-ocid": `dashboard-track-row-${track.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-md bg-secondary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4 text-muted-foreground" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-44", children: track.title })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: track.genre }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-muted-foreground capitalize", children: track.trackType === TrackType.album ? "Album" : "Single" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-muted-foreground text-xs", children: track.releaseDate || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-right text-foreground font-mono text-xs", children: Number(track.previewCount).toLocaleString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-right text-foreground font-mono text-xs", children: Number(track.saleCount).toLocaleString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          size: "sm",
                          variant: "ghost",
                          className: "h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10",
                          onClick: () => setEditingTrack(track),
                          "aria-label": `Edit ${track.title}`,
                          "data-ocid": `dashboard-edit-${track.id}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            type: "button",
                            size: "sm",
                            variant: "ghost",
                            className: "h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10",
                            "aria-label": `Delete ${track.title}`,
                            "data-ocid": `dashboard-delete-${track.id}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Track" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                              "Delete",
                              " ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: track.title }),
                              "? This removes it from the store permanently and cannot be undone."
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: t("cancel") }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              AlertDialogAction,
                              {
                                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                                onClick: () => deleteMutation.mutate(track.id),
                                disabled: deleteMutation.isPending,
                                "data-ocid": `dashboard-delete-confirm-${track.id}`,
                                children: t("deleteTrack")
                              }
                            )
                          ] })
                        ] })
                      ] })
                    ] }) })
                  ]
                },
                String(track.id)
              )) })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 sm:mb-8", children: !showReport ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "gap-2 border-primary/30 text-primary hover:bg-primary/10 w-full sm:w-auto",
            onClick: () => setShowReport(true),
            "data-ocid": "dashboard-show-report-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              "View Download Report"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          DownloadReportSection,
          {
            entries: reportEntries ?? [],
            isLoading: reportLoading
          }
        ) }),
        profile && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SocialLinksEditor,
          {
            actor,
            sessionToken,
            profileId: profile.id,
            queryClient
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-elevated p-4 sm:p-6 mb-6 sm:mb-8",
            "data-ocid": "dashboard-change-pin",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Change PIN" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "ghost",
                    onClick: () => {
                      setShowChangePIN((v) => !v);
                      setCurrentPIN("");
                      setNewPIN("");
                      setConfirmNewPIN("");
                    },
                    "data-ocid": "dashboard-change-pin-toggle",
                    children: showChangePIN ? t("cancel") : "Update PIN"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Update your account PIN. You'll need your current PIN to make changes." }),
              showChangePIN && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border-t border-border pt-4 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "current-pin", children: "Current PIN" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "current-pin",
                      type: "password",
                      inputMode: "numeric",
                      placeholder: "Enter current PIN",
                      value: currentPIN,
                      onChange: (e) => setCurrentPIN(e.target.value.replace(/\D/g, "").slice(0, 6)),
                      maxLength: 6,
                      disabled: pinPending,
                      "data-ocid": "dashboard-current-pin-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-pin", children: "New PIN (4–6 digits)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "new-pin",
                        type: "password",
                        inputMode: "numeric",
                        placeholder: "Enter new PIN",
                        value: newPIN,
                        onChange: (e) => setNewPIN(e.target.value.replace(/\D/g, "").slice(0, 6)),
                        maxLength: 6,
                        disabled: pinPending,
                        "data-ocid": "dashboard-new-pin-input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm-new-pin", children: "Confirm New PIN" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "confirm-new-pin",
                        type: "password",
                        inputMode: "numeric",
                        placeholder: "Re-enter new PIN",
                        value: confirmNewPIN,
                        onChange: (e) => setConfirmNewPIN(
                          e.target.value.replace(/\D/g, "").slice(0, 6)
                        ),
                        maxLength: 6,
                        disabled: pinPending,
                        className: confirmNewPIN.length > 0 && newPIN !== confirmNewPIN ? "border-destructive" : "",
                        "data-ocid": "dashboard-confirm-new-pin-input"
                      }
                    ),
                    confirmNewPIN.length > 0 && newPIN !== confirmNewPIN && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "PINs do not match" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    disabled: pinPending || currentPIN.length < 4 || newPIN.length < 4 || newPIN !== confirmNewPIN,
                    onClick: async () => {
                      if (!/^\d{4,6}$/.test(newPIN)) {
                        ue.error("New PIN must be 4–6 digits.");
                        return;
                      }
                      setPinPending(true);
                      try {
                        const currentHash = await hashPin(currentPIN);
                        const newHash = await hashPin(newPIN);
                        await changePIN(currentHash, newHash);
                        ue.success("PIN updated successfully! 🔐");
                        setShowChangePIN(false);
                        setCurrentPIN("");
                        setNewPIN("");
                        setConfirmNewPIN("");
                      } catch (err) {
                        ue.error(
                          err.message || "Failed to update PIN."
                        );
                      } finally {
                        setPinPending(false);
                      }
                    },
                    className: "w-full sm:w-auto gap-2",
                    "data-ocid": "dashboard-change-pin-submit",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4" }),
                      pinPending ? "Updating…" : "Update PIN"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        profile && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SecurityQuestionSection,
          {
            actor,
            sessionToken,
            artistName
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-elevated border-destructive/30 p-4 sm:p-6",
            "data-ocid": "dashboard-danger-zone",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-destructive mb-1", children: "Danger Zone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Permanently delete your artist account and all associated tracks. This action cannot be undone." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "destructive",
                    size: "sm",
                    className: "gap-2 w-full sm:w-auto",
                    "data-ocid": "dashboard-delete-account-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                      "Delete Account"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "dashboard-delete-account-dialog", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Artist Account" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                      "This will permanently delete your artist profile, all your tracks, and all associated data. This action",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "cannot be undone" }),
                      "."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "dashboard-delete-account-cancel", children: t("cancel") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AlertDialogAction,
                      {
                        className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                        onClick: () => deleteAccountMutation.mutate(),
                        disabled: deleteAccountMutation.isPending,
                        "data-ocid": "dashboard-delete-account-confirm",
                        children: "Yes, Delete My Account"
                      }
                    )
                  ] })
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
  Dashboard as default
};
